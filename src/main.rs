use axum::{
    extract::Json,
    http::{Method, StatusCode},
    response::Json as JsonResponse,
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::Mutex;
use tower_http::cors::{Any, CorsLayer};
use tracing::{info, warn};

// Data structures
#[derive(Debug, Serialize, Deserialize)]
struct ProcessingRequest {
    data: Vec<i32>,
    operation: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct ProcessingResponse {
    result: Vec<i32>,
    operation: String,
    processing_time_ms: u64,
    message: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct HealthResponse {
    status: String,
    uptime: u64,
    version: String,
}

// Shared state
struct AppState {
    request_count: Mutex<u64>,
    start_time: std::time::Instant,
}

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();

    let state = Arc::new(AppState {
        request_count: Mutex::new(0),
        start_time: std::time::Instant::now(),
    });

    // Configure CORS
    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any);

    // Build our application with a route
    let app = Router::new()
        .route("/health", get(health_check))
        .route("/process", post(process_data))
        .route("/stats", get(get_stats))
        .layer(cors)
        .with_state(state);

    let port = std::env::var("RUST_PORT").unwrap_or_else(|_| "8080".to_string());
    let addr = format!("0.0.0.0:{}", port);

    info!("🚀 Rust backend starting on {}", addr);

    // Run it
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    info!("✅ Rust backend listening on {}", addr);

    axum::serve(listener, app).await.unwrap();
}

async fn health_check(
    axum::extract::State(state): axum::extract::State<Arc<AppState>>,
) -> JsonResponse<HealthResponse> {
    Json(HealthResponse {
        status: "healthy".to_string(),
        uptime: state.start_time.elapsed().as_secs(),
        version: env!("CARGO_PKG_VERSION").to_string(),
    })
}

async fn process_data(
    axum::extract::State(state): axum::extract::State<Arc<AppState>>,
    Json(payload): Json<ProcessingRequest>,
) -> Result<JsonResponse<ProcessingResponse>, StatusCode> {
    let start_time = std::time::Instant::now();
    
    // Increment request counter
    {
        let mut count = state.request_count.lock().await;
        *count += 1;
    }

    info!("Processing request: {:?}", payload);

    // Store the data length before processing
    let data_len = payload.data.len();

    let result = match payload.operation.as_str() {
        "sort" => {
            let mut data = payload.data.clone();
            data.sort();
            data
        }
        "reverse" => {
            let mut data = payload.data.clone();
            data.reverse();
            data
        }
        "double" => {
            payload.data.into_iter().map(|x| x * 2).collect()
        }
        "square" => {
            payload.data.into_iter().map(|x| x * x).collect()
        }
        "sum" => {
            let sum = payload.data.iter().sum::<i32>();
            vec![sum]
        }
        "parallel_process" => {
            // Demonstrate parallel processing with rayon
            use rayon::prelude::*;
            payload.data
                .par_iter()
                .map(|&x| {
                    // Simulate some CPU-intensive work
                    std::thread::sleep(std::time::Duration::from_millis(1));
                    x * x + x
                })
                .collect()
        }
        _ => {
            warn!("Unknown operation: {}", payload.operation);
            return Err(StatusCode::BAD_REQUEST);
        }
    };

    let processing_time = start_time.elapsed().as_millis() as u64;

    Ok(Json(ProcessingResponse {
        result,
        operation: payload.operation,
        processing_time_ms: processing_time,
        message: format!("Processed {} items in {}ms", data_len, processing_time),
    }))
}

async fn get_stats(
    axum::extract::State(state): axum::extract::State<Arc<AppState>>,
) -> JsonResponse<serde_json::Value> {
    let request_count = *state.request_count.lock().await;
    let uptime = state.start_time.elapsed().as_secs();

    Json(serde_json::json!({
        "requests_processed": request_count,
        "uptime_seconds": uptime,
        "requests_per_second": if uptime > 0 { request_count as f64 / uptime as f64 } else { 0.0 },
        "cpu_cores": num_cpus::get(),
        "memory_usage_mb": get_memory_usage(),
    }))
}

fn get_memory_usage() -> u64 {
    // This is a simplified memory usage calculation
    // In a real application, you might want to use a proper memory tracking library
    std::mem::size_of::<AppState>() as u64
} 
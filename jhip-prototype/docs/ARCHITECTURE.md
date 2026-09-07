# Technical Architecture Document
## Jharkhand Health Intelligence Platform (J-HIP)

**Document Version**: 1.0.0  
**Date**: August 2026  
**Classification**: For Limited Distribution

---

## 1. Executive Summary

This document describes the technical architecture of J-HIP, a hybrid cloud-native health intelligence platform leveraging:
- **State Data Centre (SDC)** for sovereign data hosting
- **IndiaAI Mission GPU Cloud** for AI training/inference
- **Open-source-first stack** to avoid vendor lock-in

### Architecture Principles
1. **Capital-Light**: Maximize existing SDC infrastructure; pay-for-use GPU cloud
2. **Offline-First**: Mobile app functions in zero-connectivity tribal regions
3. **Privacy by Design**: DPDP Act 2023 compliance embedded at every layer
4. **Human-in-the-Loop**: All AI outputs advisory only; clinician retains authority
5. **Interoperable**: HL7 FHIR R4 standard for all health data exchanges
6. **Scalable**: Kubernetes-native microservices with horizontal auto-scaling
7. **Observable**: Full distributed tracing, metrics, and logging

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              DELIVERY CHANNELS                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────────────────┐   │
│  │   Sahiya App     │  │  Web Dashboard   │  │  IVR/WhatsApp/SMS Gateway   │   │
│  │   (Flutter)      │  │  (Next.js 14)    │  │  (Twilio/Bhashini Voice)    │   │
│  │                  │  │                  │  │                             │   │
│  │  • Offline-first │  │  • State/District│  │  • Multilingual voice calls │   │
│  │  • SQLite cache  │  │  • Executive view│  │  • Automated reminders      │   │
│  │  • Voice UI      │  │  • Real-time DSI │  │  • Grievance intake         │   │
│  └──────────────────┘  └──────────────────┘  └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼ HTTPS/TLS 1.3
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           API GATEWAY LAYER                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                    Kong API Gateway + Istio Service Mesh                  │   │
│  │                                                                           │   │
│  │  • Authentication (OAuth2/OIDC via Keycloak)                             │   │
│  │  • Rate limiting (1000 req/min per client)                               │   │
│  │  • Request routing & load balancing                                      │   │
│  │  • mTLS between microservices                                            │   │
│  │  • Circuit breaker pattern                                               │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        APPLICATION MICROSERVICES                                 │
│                     (Kubernetes Pods @ State Data Centre)                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ Ingestion   │  │ MPI/ABHA    │  │ FHIR        │  │ AI          │            │
│  │ Service     │  │ Service     │  │ Gateway     │  │ Inference   │            │
│  │             │  │             │  │             │  │ Service     │            │
│  │ • ETL jobs  │  │ • Matching  │  │ • HAPI      │  │ • REST      │            │
│  │ • Airflow   │  │ • Dedup     │  │ • Consent   │  │ • gRPC      │            │
│  │ • Kafka     │  │ • Token gen │  │ • Mapping   │  │ • Triton    │            │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ Pillar 1    │  │ Pillar 2    │  │ Pillar 3    │  │ Pillar 4    │            │
│  │ Population  │  │ Tribal &    │  │ Clinical    │  │ Financial   │            │
│  │ Health      │  │ Occupational│  │ Decision    │  │ Integrity   │            │
│  │ Services    │  │ Services    │  │ Support     │  │ Services    │            │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ Pillar 5    │  │ Notification│  │ Grievance   │  │ Reporting   │            │
│  │ Hospital    │  │ Service     │  │ Redressal   │  │ Service     │            │
│  │ Performance │  │ • IVR       │  │ • NLP       │  │ • Analytics │            │
│  │ Services    │  │ • WhatsApp  │  │ • Routing   │  │ • Exports   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            DATA LAYER (SDC)                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐              │
│  │ Apache Iceberg   │  │ PostgreSQL 15+   │  │ Elasticsearch 8  │              │
│  │ Data Lake        │  │ (Primary DB)     │  │ (Search/Logs)    │              │
│  │                  │  │                  │  │                  │              │
│  │ • Patient events │  │ • MPI registry   │  │ • Audit logs     │              │
│  │ • Clinical facts │  │ • User accounts  │  │ • Patient search │              │
│  │ • Time travel    │  │ • Transactions   │  │ • Full-text      │              │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘              │
│                                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐              │
│  │ Milvus/Qdrant    │  │ Redis 7.x        │  │ MinIO            │              │
│  │ Vector DB        │  │ (Cache)          │  │ (Object Store)   │              │
│  │                  │  │                  │  │                  │              │
│  │ • RAG embeddings │  │ • Sessions       │  │ • Documents      │              │
│  │ • Semantic search│  │ • Rate limits    │  │ • Backups        │              │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘              │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼ Secure API
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      INDIAAI MISSION GPU CLOUD                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                    AI Training & Heavy Inference                         │    │
│  │                                                                          │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │    │
│  │  │ Tribal      │  │ Computer    │  │ Clinical    │  │ LLM         │    │    │
│  │  │ Speech NLP  │  │ Vision      │  │ Risk        │  │ Fine-tuning │    │    │
│  │  │ (ASR/TTS)   │  │ (X-Ray)     │  │ Models      │  │ (LoRA)      │    │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │    │
│  │                                                                          │    │
│  │  Hardware: NVIDIA H200 80GB GPUs (subsidized tariff: ₹375/hour)         │    │
│  │  Framework: PyTorch 2.x, Kubeflow, MLflow                               │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL SYSTEM INTEGRATIONS                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│  e-Shusrut │ HMIS │ RCH │ Nikshay │ PM-JAY │ U-WIN │ ABDM │ DVDMS │ Garima   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Infrastructure Specification

### 3.1 State Data Centre (SDC) Compute

| Component | vCPU Cores | RAM (GB) | Storage | Nodes | Purpose |
|-----------|------------|----------|---------|-------|---------|
| Data Lake Cluster | 128 | 512 | 50 TB NVMe | 4 | Apache Iceberg, Spark, Airflow |
| MPI Database | 128 | 256 | 20 TB NVMe | 4 | PostgreSQL, Master Patient Index |
| FHIR Gateway | 128 | 256 | 10 TB NVMe | 4 | HAPI FHIR, API Gateway |
| Application Servers | 128 | 256 | 10 TB NVMe | 4 | Microservices, Kubernetes workers |
| AI Scoring Engine | 256 | 512 | 40 TB NVMe | 8 | Tabular models, rules engine |
| Dev/UAT Environment | 64 | 128 | 10 TB SSD | 2 | Development, staging, testing |
| **TOTAL** | **832** | **1,920** | **140 TB** | **26** | — |

**Cost**: ₹0.00 (provided by Government of Jharkhand at zero incremental cost)

### 3.2 IndiaAI GPU Cloud

| Workload | GPU Model | Hours/Month | Rate (₹/hr) | Monthly Cost (₹) |
|----------|-----------|-------------|-------------|------------------|
| **Development Training (Months 1-12)** |||||
| Tribal Speech NLP Fine-Tuning | H200 80GB | 700 | 375 | 2,62,500 |
| Computer Vision X-Ray Models | H200 80GB | 800 | 375 | 3,00,000 |
| Maternal/Neonatal Risk Models | H200 80GB | 700 | 375 | 2,62,500 |
| Claims Anomaly Detection GNN | H200 80GB | 400 | 375 | 1,50,000 |
| LLM Clinical Summary LoRA | H200 80GB | 900 | 375 | 3,37,500 |
| Dashboard Analytics NLP | H200 80GB | 500 | 375 | 1,87,500 |
| **Subtotal Dev** | | **4,000** | | **15,00,000** |
| **O&M Hosting (Months 13-60)** |||||
| Vernacular Voice TTS Hosting | H200 80GB | 2,000 | 375 | 7,50,000 |
| Diagnostic X-Ray Inference | H200 80GB | 2,400 | 375 | 9,00,000 |
| LLM Patient Summary Tokens | H200 80GB | 2,000 | 375 | 7,50,000 |
| Dashboard Real-Time NLP | H200 80GB | 1,600 | 375 | 6,00,000 |
| Model Drift Recalibration | H200 80GB | 1,200 | 375 | 4,50,000 |
| **Subtotal O&M** | | **9,200** | | **34,50,000** |
| **TOTAL (5 years)** | | **13,200** | | **49,50,000** |

### 3.3 Network Architecture

```
Internet
    │
    ▼
┌─────────────────────────────────────┐
│  Load Balancer (F5/AWS ALB)         │
│  • TLS termination                  │
│  • DDoS protection                  │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  DMZ Zone                           │
│  • Kong API Gateway                 │
│  • WAF (Web Application Firewall)   │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  Application Zone (Kubernetes)      │
│  • Microservices pods               │
│  • Istio service mesh               │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  Data Zone                          │
│  • PostgreSQL cluster (Patroni)     │
│  • MinIO object storage             │
│  • Elasticsearch cluster            │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  Backup Zone                        │
│  • Daily snapshots                  │
│  • Off-site replication             │
└─────────────────────────────────────┘
```

---

## 4. Data Architecture

### 4.1 Data Flow Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Stage 1: Automated Ingestion & ETL Layer                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  Source Systems ──► [REST API / SFTP / Webhooks] ──► Apache Kafka               │
│                                                                                  │
│  • e-Shusrut (nightly batch + real-time discharge events)                       │
│  • HMIS (daily aggregated indicators)                                           │
│  • RCH Portal (hourly ANC/PNC updates)                                          │
│  • Nikshay (real-time TB treatment events)                                      │
│  • PM-JAY TMS (daily claims + pre-auth)                                         │
│  • Sahiya MIS (on-device sync when online)                                      │
│  • U-WIN (real-time vaccination records)                                        │
│  • DVDMS (daily drug inventory)                                                 │
│                                                                                  │
│  Orchestration: Apache Airflow DAGs                                             │
│  Schedule: Nightly 2 AM IST for batches; <5 min latency for streaming           │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Stage 2: State Health Data Lake & Master Patient Index                          │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  Kafka ──► Spark Structured Streaming ──► Apache Iceberg Tables                 │
│                                                                                  │
│  Partitioning Strategy:                                                          │
│  • By district (24 districts)                                                   │
│  • By facility_id (~5,000 facilities)                                           │
│  • By event_date (daily partitions)                                             │
│                                                                                  │
│  Master Patient Index (MPI):                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐        │
│  │ 1. ABHA Match (14-digit health ID) - Priority 1                     │        │
│  │    ► Direct match if ABHA present                                   │        │
│  │                                                                     │        │
│  │ 2. Deterministic Match - Priority 2                                 │        │
│  │    ► Aadhaar hash (if consented)                                    │        │
│  │    ► Ration card number                                             │        │
│  │    ► Mobile number hash                                             │        │
│  │                                                                     │        │
│  │ 3. Probabilistic Match - Priority 3                                 │        │
│  │    ► Name (Levenshtein distance <3)                                 │        │
│  │    ► Age (±2 years)                                                 │        │
│  │    ► Village code (exact)                                           │        │
│  │    ► Gender (exact)                                                 │        │
│  │                                                                     │        │
│  │ Output: Unique patient_id + pseudo-anonymization token              │        │
│  └─────────────────────────────────────────────────────────────────────┘        │
│                                                                                  │
│  PII Decoupling:                                                                 │
│  • Direct identifiers stored in encrypted MPI table                             │
│  • Clinical data linked via one-way hashed token                                │
│  • Token不可逆 (no reverse engineering possible)                                │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Stage 3: AI Inference & Model Execution Layer                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  Feature Engineering Pipeline:                                                   │
│  • Aggregate patient history (visits, diagnoses, medications)                   │
│  • Compute risk scores (vitals trends, lab abnormalities)                       │
│  • Generate embeddings (clinical notes, tribal language audio)                  │
│                                                                                  │
│  Model Deployment:                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐        │
│  │ Lightweight Models (SDC CPU)            │ Heavy Models (IndiaAI GPU)│        │
│  │ • Tabular risk scores (XGBoost)         │ • Tribal speech ASR/TTS   │        │
│  │ • Rules-based alerts (Drools)           │ • Computer vision (X-ray) │        │
│  │ • LLM inference (quantized 4-bit)       │ • LLM fine-tuning (LoRA)  │        │
│  │ • Real-time scoring (<100ms)            │ • Batch retraining        │        │
│  └─────────────────────────────────────────────────────────────────────┘        │
│                                                                                  │
│  Container Orchestration:                                                        │
│  • Docker containers with model artifacts                                       │
│  • Kubernetes Deployments with HPA (Horizontal Pod Autoscaling)                 │
│  • Triton Inference Server for GPU models                                       │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Stage 4: Actionable Output & Delivery Channels                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  Role-Based Endpoints:                                                           │
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐        │
│  │ Executive Smart Dashboards (Chief Secretary, Civil Surgeons)        │        │
│  │ • District heat-maps (DSI - Disease Severity Index)                 │        │
│  │ • Readmission trends                                                │        │
│  │ • Facility performance scorecards                                   │        │
│  │ Technology: Next.js 14 + D3.js + WebSocket real-time updates        │        │
│  └─────────────────────────────────────────────────────────────────────┘        │
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐        │
│  │ Frontline Sahiya Task Lists (Mobile App)                            │        │
│  │ • Priority daily home-visit list                                    │        │
│  │ • Vernacular audio cues (Santhali, Ho, Mundari, etc.)              │        │
│  │ • Reason for visit + required action + deadline                     │        │
│  │ Technology: Flutter + WatermelonDB (offline SQLite)                 │        │
│  └─────────────────────────────────────────────────────────────────────┘        │
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐        │
│  │ Citizen Multichannel Gateway                                        │        │
│  │ • Automated IVR voice calls (tribal languages)                      │        │
│  │ • Interactive WhatsApp messages                                     │        │
│  │ • SMS reminders (for feature phones)                                │        │
│  │ Technology: Bhashini Voice APIs + Twilio + Meta WhatsApp Business   │        │
│  └─────────────────────────────────────────────────────────────────────┘        │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Data Model (Simplified ERD)

```
┌─────────────────────┐       ┌─────────────────────┐
│      PATIENT        │       │     FACILITY        │
├─────────────────────┤       ├─────────────────────┤
│ patient_id (PK)     │◄──────│ facility_id (PK)    │
│ abha_number         │  1:N  │ name                │
│ mpi_token           │       │ district            │
│ name_hash           │       │ type (PHC/CHC/DH)   │
│ gender              │       │ lat_long            │
│ birth_date          │       └─────────────────────┘
│ village_code        │
│ tribal_status       │              ▲
│ is_pvtg             │              │
│ is_bpl              │              │ 1:N
└─────────────────────┘              │
        ▲                            │
        │ 1:N                        │
        │                            │
┌─────────────────────┐       ┌─────────────────────┐
│     ENCOUNTER       │       │   HEALTH_WORKER     │
├─────────────────────┤       ├─────────────────────┤
│ encounter_id (PK)   │       │ worker_id (PK)      │
│ patient_id (FK)     │       │ facility_id (FK)    │
│ facility_id (FK)    │       │ role (Sahiya/ANM/MO)│
│ encounter_date      │       │ name                │
│ encounter_type      │       │ mobile_hash         │
│ diagnosis_codes     │       │ village_coverage    │
│ procedure_codes     │       └─────────────────────┘
│ provider_id         │
└─────────────────────┘
        ▲
        │ 1:N
        │
┌─────────────────────┐       ┌─────────────────────┐
│   OBSERVATION       │       │       CLAIM         │
├─────────────────────┤       ├─────────────────────┤
│ observation_id (PK) │       │ claim_id (PK)       │
│ encounter_id (FK)   │       │ patient_id (FK)     │
│ observation_code    │       │ scheme (MASSY/PMJAY)│
│ value_numeric       │       │ claim_amount        │
│ value_coded         │       │ status              │
│ unit                │       │ fraud_score         │
│ reference_range     │       │ anomaly_flags       │
└─────────────────────┘       └─────────────────────┘
```

---

## 5. Security Architecture

### 5.1 Defense in Depth

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Layer 1: Perimeter Security                                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • DDoS protection (cloud provider + on-prem)                                   │
│ • Web Application Firewall (WAF)                                               │
│ • Geo-blocking (allow only India IPs for admin access)                         │
│ • Network segmentation (DMZ, App, Data zones)                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Layer 2: Authentication & Authorization                                         │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • OAuth2/OIDC via Keycloak                                                     │
│ • Multi-factor authentication (MFA) for privileged users                       │
│ • Role-Based Access Control (RBAC)                                             │
│ • Attribute-Based Access Control (ABAC) for sensitive data                     │
│ • Session timeout (15 minutes for clinical users)                              │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Layer 3: Data Protection                                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Encryption at rest: AES-256 (PostgreSQL TDE, MinIO SSE)                      │
│ • Encryption in transit: TLS 1.3 (all external + internal mTLS)                │
│ • Dynamic de-identification before AI training                                 │
│ • Field-level encryption for sensitive attributes                              │
│ • HashiCorp Vault for secrets management                                       │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Layer 4: Audit & Monitoring                                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Immutable audit logs (write-once, read-many)                                 │
│ • SIEM integration (Wazuh)                                                     │
│ • Real-time alerting on suspicious activity                                    │
│ • Bi-annual VAPT audits (CERT-In empanelled)                                   │
│ • Annual privacy compliance audits (DPDP Act 2023)                             │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 RBAC Matrix

| Role | Patient Data | Clinical Notes | AI Outputs | Financial Data | Audit Logs |
|------|--------------|----------------|------------|----------------|------------|
| Sahiya | Own village patients | View only | View task lists | None | View own actions |
| ANM | Block-level patients | View only | View prioritized lists | None | View own actions |
| Medical Officer | Facility patients | Full CRUD | Review + override | View facility claims | View facility logs |
| Civil Surgeon | District patients | View only | District aggregates | District financials | District audit trail |
| State Leadership | Aggregated/de-identified | View only | State dashboards | State budget/utilization | Full audit access |
| IT Administrator | No access | No access | No access | No access | Full system logs |
| Auditor | Read-only (sampled) | Read-only | Read-only | Full access | Full access |

---

## 6. MLOps Architecture

### 6.1 Model Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          MLOps Pipeline (Kubeflow + MLflow)                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  1. DATA VERSIONING                                                              │
│     ┌─────────────┐                                                             │
│     │ DVC (Data   │────► Versioned datasets in MinIO                            │
│     │ Version     │                                                             │
│     │ Control)    │                                                             │
│     └─────────────┘                                                             │
│                                                                                  │
│  2. EXPERIMENT TRACKING                                                          │
│     ┌─────────────┐                                                             │
│     │ MLflow      │────► Metrics, params, artifacts logged                       │
│     │ Tracking    │                                                             │
│     │ Server      │                                                             │
│     └─────────────┘                                                             │
│                                                                                  │
│  3. MODEL TRAINING (IndiaAI GPU)                                                 │
│     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                    │
│     │ Hyperparam  │────►│ Distributed │────►│ Validation  │                    │
│     │ Tuning      │     │ Training    │     │ Metrics     │                    │
│     │ (Optuna)    │     │ (PyTorch)   │     │ (AUC, F1)   │                    │
│     └─────────────┘     └─────────────┘     └─────────────┘                    │
│                                                                                  │
│  4. MODEL REGISTRY                                                               │
│     ┌─────────────┐                                                             │
│     │ MLflow      │────► Staging → Production → Archived                        │
│     │ Model       │                                                             │
│     │ Registry    │                                                             │
│     └─────────────┘                                                             │
│                                                                                  │
│  5. DEPLOYMENT                                                                   │
│     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                    │
│     │ Blue-Green  │────►│ Canary      │────►│ Rollback    │                    │
│     │ Deploy      │     │ Release     │     │ (if anomalous)│                   │
│     └─────────────┘     └─────────────┘     └─────────────┘                    │
│                                                                                  │
│  6. MONITORING                                                                   │
│     ┌─────────────┐     ┌─────────────┐                                         │
│     │ PSI/CSI     │────►│ Auto-alert  │────► Trigger retraining if PSI >0.20   │
│     │ Drift Detect│     │ (Prometheus)│                                         │
│     └─────────────┘     └─────────────┘                                         │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Model Cards Template

Each AI model deployed must have an accompanying Model Card documenting:
- **Intended Use**: Clinical decision support only (not diagnostic)
- **Training Data**: Source, time period, demographic breakdown
- **Performance Metrics**: AUC, sensitivity, specificity by subgroup
- **Bias Testing**: Disparate impact ratio across ST/General, gender, districts
- **Known Limitations**: Populations/settings where model may underperform
- **Override Instructions**: How clinicians can override and log rationale
- **Version History**: Changelog of updates and recalibrations

---

## 7. Disaster Recovery Plan

### 7.1 RTO/RPO Targets

| System Component | RTO (Recovery Time Objective) | RPO (Recovery Point Objective) |
|------------------|-------------------------------|--------------------------------|
| Core Microservices | <1 hour | <15 minutes |
| PostgreSQL Database | <2 hours | <5 minutes (WAL archiving) |
| Data Lake (Iceberg) | <4 hours | <1 hour |
| AI Inference Services | <1 hour | <15 minutes (model registry) |
| Mobile App Backend | <30 minutes | <5 minutes |

### 7.2 DR Strategy

```
Primary Site (SDC Ranchi)          Secondary Site (DR Location)
────────────────────────           ────────────────────────
• Active production workload   ──► • Hot standby (K8s cluster)
• PostgreSQL Patroni cluster   ──► • Synchronous replication (PGD)
• MinIO erasure coding         ──► • Cross-region replication
• Daily snapshots              ──► • Snapshot copies off-site

Quarterly DR Drills:
1. Simulate primary site failure
2. Failover to DR site (automated via Kubernetes federation)
3. Validate data integrity and application functionality
4. Document lessons learned
5. Update runbooks accordingly
```

---

## 8. Observability Stack

### 8.1 Monitoring Components

| Component | Tool | Purpose | Retention |
|-----------|------|---------|-----------|
| Metrics | Prometheus + Grafana | System performance, business KPIs | 1 year |
| Logs | ELK Stack (Elasticsearch, Logstash, Kibana) | Application logs, audit trails | 7 years |
| Traces | Jaeger | Distributed tracing across microservices | 30 days |
| Alerts | Alertmanager + PagerDuty | On-call notifications, escalation | 90 days |
| Uptime | Synthetics (k6) | External monitoring from multiple locations | 1 year |
| Security | Wazuh SIEM | Security event correlation, threat detection | 7 years |

### 8.2 Key Dashboards

1. **Executive Dashboard**: Uptime, active users, AI predictions/day, grievance resolution rate
2. **Clinical Safety Dashboard**: Override rates, adverse events, bias metrics
3. **Infrastructure Dashboard**: CPU/memory/disk usage, pod health, network latency
4. **Data Pipeline Dashboard**: ETL job success rate, data freshness, record counts
5. **Model Performance Dashboard**: AUC trends, drift metrics, recalibration status

---

## 9. Technology Stack Summary

| Category | Technology | Version | License |
|----------|------------|---------|---------|
| **Backend** ||||
| Language | Python | 3.11+ | PSF |
| Web Framework | FastAPI | 0.109+ | MIT |
| ORM | SQLAlchemy | 2.0+ | MIT |
| Task Queue | Celery | 5.3+ | BSD |
| **Frontend** ||||
| Web Framework | Next.js | 14+ | MIT |
| Mobile Framework | Flutter | 3.x | BSD |
| State Management | Zustand (web), Riverpod (mobile) | - | MIT |
| **Data** ||||
| Primary Database | PostgreSQL | 15+ | PostgreSQL |
| Data Lake | Apache Iceberg | 1.4+ | Apache 2.0 |
| Search Engine | Elasticsearch | 8.x | SSPL |
| Vector DB | Milvus | 2.3+ | Apache 2.0 |
| Cache | Redis | 7.x | BSD |
| Object Store | MinIO | Latest | AGPL |
| **AI/ML** ||||
| Deep Learning | PyTorch | 2.x | BSD |
| LLM | Llama 3, Mistral | - | OpenRAIL |
| RAG Framework | LangChain | 0.1+ | MIT |
| MLOps | Kubeflow, MLflow | - | Apache 2.0 |
| Explainability | SHAP, LIME | - | MIT |
| **Infrastructure** ||||
| Container Orch. | Kubernetes | 1.28+ | Apache 2.0 |
| Service Mesh | Istio | 1.20+ | Apache 2.0 |
| API Gateway | Kong | 3.x | Apache 2.0 |
| IaC | Terraform, Helm | - | MPL, Apache 2.0 |
| CI/CD | GitLab CI, ArgoCD | - | MIT, Apache 2.0 |
| **Security** ||||
| IAM | Keycloak | 23+ | Apache 2.0 |
| Secrets | HashiCorp Vault | 1.15+ | BSL |
| SIEM | Wazuh | 4.7+ | GPL |

---

**Document Approval**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Chief Architect, J-HIP | | | |
| State IT Director, Jharkhand | | | |
| Clinical AI Safety Board Chair | | | |
| System Integrator CTO | | | |

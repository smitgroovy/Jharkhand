# MLOps Playbook
## Jharkhand Health Intelligence Platform (J-HIP)

**Document Version**: 1.0.0  
**Date**: August 2026  

---

## 1. Overview

This playbook defines the Machine Learning Operations (MLOps) practices for developing, deploying, and maintaining AI models in production across J-HIP's 27 use cases.

### Key Principles
- **Reproducibility**: Every experiment tracked; every model versioned
- **Automation**: CI/CD pipelines for model training and deployment
- **Monitoring**: Continuous drift detection with automated alerts
- **Governance**: Clinical Safety Board approval for all production models
- **Efficiency**: Leverage IndiaAI GPU subsidies for heavy workloads

---

## 2. Technology Stack

| Component | Tool | Purpose |
|-----------|------|---------|
| Experiment Tracking | MLflow | Metrics, parameters, artifacts |
| Data Versioning | DVC | Dataset versioning in MinIO |
| Workflow Orchestration | Kubeflow Pipelines | Training pipeline automation |
| Hyperparameter Tuning | Optuna | Automated HPO |
| Model Registry | MLflow Model Registry | Staging/promotion workflows |
| Container Registry | Harbor | Secure model artifact storage |
| Inference Server | NVIDIA Triton | High-performance serving |
| Monitoring | Prometheus + Grafana | Performance metrics, drift alerts |
| Feature Store | Feast | Consistent features train/serve |

---

## 3. Development Workflow

### Local Development
```bash
git clone https://github.com/jharkhand-health/jhip-ml.git
cd jhip-ml
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
dvc pull
mlflow server --host 127.0.0.1 --port 5000
python models/pillar1_hrp/src/train.py --config configs/experiment_v1.yaml
```

### Experiment Tracking
All experiments logged to MLflow with:
- Parameters (hyperparameters, data version)
- Metrics (AUC, F1, calibration error)
- Fairness metrics by subgroup
- Model artifacts with signature

---

## 4. Model Registry & Promotion

### Stage Transitions
None → Staging → Production → Archived

### Promotion Criteria
| Stage | Requirements | Approval |
|-------|--------------|----------|
| Staging | AUC > threshold, fairness pass, tests pass | Data Science Lead |
| Production | Clinical validation, Safety Board review, DR drill | Clinical AI Safety Board |
| Archived | Superseded or retired | PMU Director |

---

## 5. Deployment

### Blue-Green Deployment Strategy
1. Deploy new version as "green"
2. Run smoke tests
3. Switch traffic via Istio VirtualService
4. Monitor for 30 minutes
5. Tear down old "blue" deployment

### Kubernetes Configuration
- Horizontal Pod Autoscaling (min: 3, max: 10 replicas)
- Resource limits: 4 CPU, 8Gi memory per pod
- mTLS between services via Istio

---

## 6. Monitoring & Drift Detection

### Key Metrics
| Metric | Threshold | Action |
|--------|-----------|--------|
| Population Stability Index (PSI) | >0.20 | Alert data science team |
| AUC-ROC degradation | Drop >0.04 | Trigger validation review |
| Calibration slope | <0.85 or >1.15 | Schedule recalibration |
| Override rate increase | >20% month-over-month | Clinical review |

### Automated Alerts
- PSI > 0.20 → Warning alert
- AUC < 0.81 → Critical alert
- Override rate > 20% → Warning alert

---

## 7. Quarterly Retraining Schedule

| Quarter | Models Due | Data Window | GPU Hours |
|---------|------------|-------------|-----------|
| Q1 (Jan-Mar) | Pillar 1 (all 7) | Oct-Feb | 800 hours |
| Q2 (Apr-Jun) | Pillar 2 & 3 | Jan-May | 1000 hours |
| Q3 (Jul-Sep) | Pillar 4 & 5 | Apr-Aug | 900 hours |
| Q4 (Oct-Dec) | All NLP/Speech models | Jul-Nov | 1100 hours |

### Retraining Checklist
- [ ] Extract latest 90-day data from Data Lake
- [ ] Validate data quality
- [ ] Run hyperparameter optimization
- [ ] Evaluate on holdout test set
- [ ] Run fairness audit
- [ ] Generate SHAP explanations
- [ ] Update Model Card
- [ ] Submit to Clinical Safety Board
- [ ] Deploy via blue-green canary
- [ ] Monitor for 30 days

---

## 8. Incident Response

### Severity Levels
| Level | Description | Response Time | Resolution SLA |
|-------|-------------|---------------|----------------|
| P0 | Harmful predictions | <15 minutes | <2 hours |
| P1 | Model unavailable | <30 minutes | <4 hours |
| P2 | Drift detected | <4 hours | <24 hours |
| P3 | Minor degradation | <24 hours | <1 week |

### Mitigation Options
- Rollback to previous version
- Adjust decision threshold
- Disable model, fallback to rules-based

---

## 9. Cost Management

### IndiaAI GPU Utilization
- Subsidized rate: ₹375/hour for NVIDIA H200 80GB
- Monthly budget tracking with 80% alert threshold
- Spot instances for non-critical training (60% savings)

### Optimization Tips
1. Quantize models to INT8 for CPU inference
2. Batch predictions during off-peak hours
3. Auto-scale to zero for dev environments
4. Cache embeddings to avoid redundant computation

---

## 10. Compliance & Audit

### Audit Trail Requirements
| Activity | Logged Fields | Retention |
|----------|---------------|-----------|
| Model Training | User, timestamp, params, metrics, data version | 7 years |
| Model Promotion | Approver, timestamp, validation results | 7 years |
| Prediction Request | Request ID, timestamp, input hash, output, latency | 90 days |
| Override Action | User, timestamp, model version, rationale | 7 years |

### Model Card Template
Each production model must include:
- Intended Use (clinical decision support only)
- Training Data (source, time period, demographics)
- Performance Metrics (overall and by subgroup)
- Fairness Assessment
- Known Limitations
- Override Instructions
- Version History

---

**Document Maintained By**: MLOps Team, J-HIP PMU  
**Review Frequency**: Quarterly  
**Next Review**: November 2026

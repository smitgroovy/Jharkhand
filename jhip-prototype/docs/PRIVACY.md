# Data Privacy & DPDP Act 2023 Compliance
## Jharkhand Health Intelligence Platform (J-HIP)

**Document Version**: 1.0.0  
**Date**: August 2026  

---

## 1. Executive Summary

This document outlines J-HIP's comprehensive data privacy framework compliant with India's **Digital Personal Data Protection (DPDP) Act, 2023**. The platform processes sensitive personal health information of ~4.06 crore citizens with embedded Privacy by Design principles.

### Key Compliance Commitments
- ✅ Explicit electronic consent via ABDM Consent Manager
- ✅ Dynamic de-identification before AI training
- ✅ End-to-end encryption (AES-256 at rest, TLS 1.3 in transit)
- ✅ Immutable audit trails for all data access
- ✅ Bi-annual CERT-In VAPT audits
- ✅ Annual algorithmic bias assessments
- ✅ Data principal rights (access, correction, erasure, portability)

---

## 2. Lawful Basis for Processing

| Processing Purpose | Lawful Basis | DPDP Section Reference |
|-------------------|--------------|----------------------|
| Public health service delivery | Legitimate use by State (Section 7) | Section 7(b) - Functions under law |
| Disease surveillance & outbreak response | Public interest | Section 7(c) - Prevention/detection of disease |
| Clinical decision support | Explicit consent + legitimate use | Section 6 + Section 7 |
| Scheme entitlement identification | Legal obligation | Section 7(a) - Compliance with law |
| Research (aggregated, de-identified) | De-identified data exemption | Section 29(2) |

---

## 3. Data Principal Rights

| Right | Section | Implementation | SLA |
|-------|---------|----------------|-----|
| Right to Access | 11(1) | Portal/App request with ABHA authentication | 15 days |
| Right to Correction | 11(2) | Online form with supporting documents | 15 days |
| Right to Erasure | 11(3) | Request reviewed by Data Protection Officer | As per law |
| Right to Portability | 11(4) | Machine-readable export (FHIR JSON) | 15 days |
| Right to Grievance Redressal | 12(2) | Multilingual ticketing system | 30 days |

---

## 4. Security Measures

| Data State | Standard | Implementation |
|------------|----------|----------------|
| At Rest | AES-256 | PostgreSQL TDE, MinIO SSE-S3, LUKS disk encryption |
| In Transit | TLS 1.3 | All external APIs, internal mTLS via Istio |
| Secrets | HashiCorp Vault | Dynamic secrets, automatic rotation |

---

## 5. Contact Information

**Data Protection Officer**  
Email: dpo.jhip@jharkhand.gov.in

**Grievance Officer**  
Email: grievances.jhip@jharkhand.gov.in

---

*Last Review Date*: August 2026  
*Next Review Date*: August 2027

import { useState, useMemo } from "react";

const ALL_DOCS = [
  // PAGE 0
  {n:1, date:"2026-02-24", title:"Update on Capital Requirements for Federally Regulated Property and Casualty Insurers – Letter", type:"Letter", category:"Capital Adequacy Requirements", sector:"P&C", status:"ACTIVE"},
  {n:2, date:"2026-01-29", title:"Liquidity Adequacy Requirements (LAR) (2026) Chapter 4 – Net Cumulative Cash Flow", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:3, date:"2026-01-29", title:"Liquidity Adequacy Requirements (LAR) (2026) Chapter 3 – Net Stable Funding Ratio", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:4, date:"2026-01-29", title:"Liquidity Adequacy Requirements (LAR) (2026) Chapter 2 – Liquidity Coverage Ratio", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:5, date:"2026-01-29", title:"Liquidity Adequacy Requirements (LAR) – Guideline (2026)", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:6, date:"2026-01-29", title:"Liquidity Adequacy Requirements Guideline (2026) – Letter", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:7, date:"2026-01-29", title:"Consultative document on Credit Risk Management", type:"Consultative document", category:"Sound Business and Financial Practices", sector:"Banks / Life / P&C / Trust", status:"CONSULTATION"},
  {n:8, date:"2026-01-29", title:"Liquidity Adequacy Requirements (LAR) (2026) Chapter 1 – Overview", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:9, date:"2026-01-29", title:"Liquidity Adequacy Requirements (LAR) (2026) Chapter 5 – Operating Cash Flow Statement", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:10, date:"2026-01-29", title:"Liquidity Adequacy Requirements (LAR) (2026) Chapter 6 – Liquidity Monitoring Tools", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:11, date:"2026-01-29", title:"Liquidity Adequacy Requirements (LAR) (2026) Chapter 7 – Intraday Liquidity Monitoring Tools", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:12, date:"2026-01-29", title:"Deferral of public consultation on Guideline B-15 disclosure expectation for financed emissions", type:"Letter", category:"—", sector:"Banks / Life / P&C / Trust", status:"ACTIVE"},
  {n:13, date:"2025-12-18", title:"OSFI maintains the level of the Domestic Stability Buffer at 3.5% – Letter (December 2025)", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks", status:"ACTIVE"},
  {n:14, date:"2025-12-16", title:"Data Collection Modernization Initiative: Get Ready for Implementation", type:"Letter", category:"Supervisory Advisories", sector:"All FRFIs", status:"ACTIVE"},
  {n:15, date:"2025-11-20", title:"Minimum Capital Test – Guideline (2026)", type:"Guideline", category:"Capital Adequacy Requirements", sector:"P&C", status:"FUTURE"},
  {n:16, date:"2025-11-20", title:"Minimum Capital Test (2026) – Letter", type:"Letter", category:"Capital Adequacy Requirements", sector:"P&C", status:"ACTIVE"},
  {n:17, date:"2025-11-20", title:"Draft Capital Adequacy Requirements Guideline (2027) – Letter", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:18, date:"2025-11-03", title:"Technology and cyber risk management self-assessment tool", type:"Assessment tool", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:19, date:"2025-10-29", title:"Letter to industry – Changes to treatment of crypto-assets exposures", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Cooperative / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:20, date:"2025-10-29", title:"Frequently asked questions – Crypto assets", type:"Frequently asked questions", category:"Capital Adequacy Requirements", sector:"Banks / Cooperative / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:21, date:"2025-10-27", title:"2025 Annual update – Manual of Reporting Forms for Deposit-Taking Institutions", type:"Letter", category:"—", sector:"Banks / Foreign Bank / Trust", status:"ACTIVE"},
  {n:22, date:"2025-10-27", title:"2025 Annual Update – Manual for Life Insurance Companies and Fraternal Benefit Societies", type:"Letter", category:"—", sector:"Foreign Insurance / Life", status:"ACTIVE"},
  {n:23, date:"2025-10-27", title:"2025 Annual Update – Manual for Canadian Mortgage Insurance Companies", type:"Letter", category:"—", sector:"Banks / Foreign Bank / Trust", status:"ACTIVE"},
  {n:24, date:"2025-10-27", title:"2025 Annual Update – Manual for Property and Casualty Insurance Companies", type:"Letter", category:"—", sector:"Foreign Insurance / P&C", status:"ACTIVE"},
  {n:25, date:"2025-09-11", title:"Guideline E-23 – Model Risk Management (2027)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"FUTURE"},
  {n:26, date:"2025-09-11", title:"Capital Adequacy Requirements (CAR) – Guideline (2026)", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:27, date:"2025-09-11", title:"CAR (2026) – Chapter 1 – Overview of Risk-based Capital Requirements", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:28, date:"2025-09-11", title:"CAR (2026) – Chapter 2 – Definition of Capital", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:29, date:"2025-09-11", title:"CAR (2026) – Chapter 3 – Operational Risk", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:30, date:"2025-09-11", title:"CAR (2026) – Chapter 4 – Credit Risk – Standardized Approach", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Bank Holding / Banks / Trust", status:"ACTIVE"},
  {n:31, date:"2025-09-11", title:"CAR (2026) – Chapter 5 – Credit Risk – Internal Ratings-Based Approach", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:32, date:"2025-09-11", title:"CAR (2026) – Chapter 6 – Securitization", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:33, date:"2025-09-11", title:"CAR (2026) – Chapter 7 – Settlement and Counterparty Risk", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:34, date:"2025-09-11", title:"CAR (2026) – Chapter 8 – Credit Valuation Adjustment (CVA) Risk", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:35, date:"2025-09-11", title:"CAR (2026) – Chapter 9 – Market Risk", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:36, date:"2025-09-11", title:"SMSBs Capital and Liquidity Requirements – Guideline (2026)", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:37, date:"2025-09-11", title:"Letter to industry – Revision of OSFI's approach regarding Administrative Monetary Penalties", type:"Letter", category:"Supervisory Advisories", sector:"All FRFIs", status:"ACTIVE"},
  {n:38, date:"2025-09-11", title:"Capital Adequacy Requirements Guideline (2026) – Letter", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:39, date:"2025-09-11", title:"Guideline E-23 – Model Risk Management (2027) – Letter", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:40, date:"2025-09-10", title:"Internal capital adequacy assessment process expectations and internal audit requirements", type:"Letter", category:"Supervisory Advisories", sector:"Banks / Trust", status:"ACTIVE"},
  {n:41, date:"2025-09-10", title:"Internal capital adequacy assessment process template", type:"Advisory", category:"Supervisory Advisories", sector:"Banks / Trust", status:"ACTIVE"},
  {n:42, date:"2025-08-18", title:"Letter to industry – OSFI's policy plan", type:"Letter", category:"—", sector:"Banks / Life", status:"ACTIVE"},
  {n:43, date:"2025-07-03", title:"OSFI Update on Capital Requirement for Federally Regulated Life Insurers – Letter", type:"Letter", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:44, date:"2025-06-26", title:"OSFI maintains the Domestic Stability Buffer at 3.50% – Letter (June 2025)", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks", status:"ACTIVE"},
  {n:45, date:"2025-06-25", title:"Data Collection Modernization Initiative Progress Update and Upcoming Priorities", type:"Letter", category:"Supervisory Advisories", sector:"All FRFIs", status:"ACTIVE"},
  {n:46, date:"2025-06-02", title:"Letter to industry on OSFI's new operating model and structure", type:"Letter", category:"—", sector:"All", status:"ACTIVE"},
  {n:47, date:"2025-05-22", title:"Public consultation on the draft Minimum Capital Test (MCT) 2026", type:"Letter", category:"Capital Adequacy Requirements", sector:"P&C", status:"ACTIVE"},
  {n:48, date:"2025-05-22", title:"Pillar 2 Liquidity and Funding Risks: Designing an ILAAP for Canadian DTIs", type:"Discussion paper", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"CONSULTATION"},
  {n:49, date:"2025-05-22", title:"Regulatory Notice on Adjustments to LICAT Guideline (2025)", type:"Regulatory notice", category:"Capital Adequacy Requirements", sector:"Foreign Insurance / Life", status:"ACTIVE"},
  {n:50, date:"2025-05-22", title:"Regulatory Notice on Adjustments to LICAT Guideline (2025) – Letter", type:"Letter", category:"Capital Adequacy Requirements", sector:"Foreign Insurance / Life", status:"ACTIVE"},
  // PAGE 1
  {n:51, date:"2025-05-22", title:"Draft LAR Guideline (2026) and Discussion Paper on Pillar 2 Liquidity – Letter", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:52, date:"2025-03-21", title:"Notice of changes to minimum base assessments", type:"Letter", category:"—", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:53, date:"2025-03-07", title:"Climate Risk Management (Guideline B-15)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Life / P&C / Trust", status:"ACTIVE"},
  {n:54, date:"2025-02-20", title:"Pillar 3 Disclosure Guideline for D-SIBs (2025)", type:"Guideline", category:"Accounting and Disclosure", sector:"Banks / Trust", status:"ACTIVE"},
  {n:55, date:"2025-02-20", title:"Pillar 3 Disclosure Guideline for SMSBs (2025)", type:"Guideline", category:"Accounting and Disclosure", sector:"Banks / Trust", status:"ACTIVE"},
  {n:56, date:"2025-02-20", title:"Capital and Liquidity Treatment of Crypto-asset Exposures Guidelines – Letter", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:57, date:"2025-02-20", title:"Capital Treatment of Crypto-asset Exposures (Insurance) – Guideline", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life / P&C", status:"ACTIVE"},
  {n:58, date:"2025-02-20", title:"Pillar 3 Disclosure Guidelines on Crypto-asset Exposures – Letter", type:"Letter", category:"Accounting and Disclosure", sector:"Banks / Trust", status:"ACTIVE"},
  {n:59, date:"2025-02-20", title:"Capital and Liquidity Treatment of Crypto-asset Exposures (Banking) – Guideline", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Foreign / Trust", status:"ACTIVE"},
  {n:60, date:"2025-02-20", title:"Draft Capital Adequacy Requirements Guideline (2026) – Letter", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:61, date:"2025-02-20", title:"Letter to Industry – Updating Guideline B-15 for the Final CSSB Standards", type:"Letter", category:"—", sector:"Banks / Life / P&C / Trust", status:"ACTIVE"},
  {n:62, date:"2025-01-15", title:"OSFI technology and cyber incident report – Detailed instructions", type:"Instructions", category:"—", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:63, date:"2025-01-01", title:"Property and Casualty Large Insurance Exposures and Investment Concentration", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"P&C", status:"ACTIVE"},
  {n:64, date:"2025-01-01", title:"Sound Reinsurance Practices and Procedures – Guideline (2025)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Life / P&C", status:"ACTIVE"},
  {n:65, date:"2025-01-01", title:"Life Insurance Capital Adequacy Test (LICAT) – Guideline (2025)", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:66, date:"2025-01-01", title:"LICAT (2025) – Chapter 1 Overview and General Requirements", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:67, date:"2025-01-01", title:"LICAT (2025) – Chapter 2 Available Capital", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:68, date:"2025-01-01", title:"LICAT (2025) – Chapter 3 Credit Risk – On-Balance Sheet Items", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:69, date:"2025-01-01", title:"LICAT (2025) – Chapter 4 Credit Risk – Off-Balance Sheet Activities", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:70, date:"2025-01-01", title:"LICAT (2025) – Chapter 5 Market Risk", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:71, date:"2025-01-01", title:"LICAT (2025) – Chapter 6 Insurance Risk", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:72, date:"2025-01-01", title:"LICAT (2025) – Chapter 7 Segregated Fund Guarantee Risk", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:73, date:"2025-01-01", title:"LICAT (2025) – Chapter 8 Operational Risk", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:74, date:"2025-01-01", title:"LICAT (2025) – Chapter 9 Participating and Adjustable Products", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:75, date:"2025-01-01", title:"LICAT (2025) – Chapter 10 Credit for Reinsurance", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:76, date:"2025-01-01", title:"LICAT (2025) – Chapter 11 Aggregation and Diversification of Risks", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:77, date:"2025-01-01", title:"LICAT (2025) – Chapter 12 Life Insurers Operating in Canada on a Branch Basis", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:78, date:"2025-01-01", title:"Mortgage Insurer Capital Adequacy Test (MICAT) – Guideline (2025)", type:"Guideline", category:"Capital Adequacy Requirements", sector:"P&C", status:"ACTIVE"},
  {n:79, date:"2024-12-17", title:"OSFI maintains Domestic Stability Buffer at 3.50% – Letter (December 2024)", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks", status:"ACTIVE"},
  {n:80, date:"2024-12-11", title:"Update on implementation timeline for Guideline B-2 title insurance provisions", type:"Letter", category:"Prudential Limits and Restrictions", sector:"P&C", status:"ACTIVE"},
  {n:81, date:"2024-11-21", title:"Revised Regulatory Notice on Commercial Real Estate Lending", type:"Regulatory notice", category:"Sound Business and Financial Practices", sector:"All", status:"ACTIVE"},
  {n:82, date:"2024-11-21", title:"Liquidity Adequacy Requirements (LAR) – Guideline (2025)", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"SUPERSEDED"},
  {n:83, date:"2024-11-21", title:"LAR (2025) Chapter 1 – Overview", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"SUPERSEDED"},
  {n:84, date:"2024-11-21", title:"LAR (2025) Chapter 3 – Net Stable Funding Ratio", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"SUPERSEDED"},
  {n:85, date:"2024-11-21", title:"LAR (2025) Chapter 4 – Net Cumulative Cash Flow", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"SUPERSEDED"},
  {n:86, date:"2024-11-21", title:"LAR (2025) Chapter 7 – Intraday Liquidity Monitoring Tools", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"SUPERSEDED"},
  {n:87, date:"2024-11-21", title:"Parental Stand-Alone (Solo) Capital Framework for Federally Regulated Life Insurers (2025)", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:88, date:"2024-11-21", title:"Mortgage Insurer Capital Adequacy Test (MICAT) 2025 – Letter", type:"Letter", category:"Capital Adequacy Requirements", sector:"P&C", status:"ACTIVE"},
  {n:89, date:"2024-11-21", title:"Regulatory Notice on Culture Risk Management – Letter", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:90, date:"2024-11-21", title:"Regulatory Notice – Culture Risk Management", type:"Regulatory notice", category:"—", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:91, date:"2024-11-21", title:"IFRS 17 Insurance Contracts Guideline", type:"Guideline", category:"—", sector:"Insurance Companies Act", status:"ACTIVE"},
  {n:92, date:"2024-11-21", title:"IFRS 17 Insurance Contracts Guideline – Letter", type:"Letter", category:"—", sector:"Insurance Companies Act", status:"ACTIVE"},
  {n:93, date:"2024-11-21", title:"OSFI exempts uninsured mortgage straight switches from prescribed MQR and implements portfolio LTI limits", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:94, date:"2024-11-21", title:"Liquidity Adequacy Requirements Guideline (2025) – Letter", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:95, date:"2024-11-21", title:"Life Insurance Capital Adequacy Test (2025) – Letter", type:"Letter", category:"—", sector:"Life", status:"ACTIVE"},
  {n:96, date:"2024-11-21", title:"LAR (2025) Chapter 2 – Liquidity Coverage Ratio", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"SUPERSEDED"},
  {n:97, date:"2024-11-21", title:"LAR (2025) Chapter 5 – Operating Cash Flow Statement", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"SUPERSEDED"},
  {n:98, date:"2024-11-21", title:"LAR (2025) Chapter 6 – Liquidity Monitoring Tools", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"SUPERSEDED"},
  {n:99, date:"2024-08-22", title:"Operational Risk Management and Resilience – Guideline (E-21)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Cooperative / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  // PAGE 2
  {n:100, date:"2024-08-22", title:"Operational Risk Management and Resilience – Letter", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Cooperative / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:101, date:"2024-08-22", title:"Life Insurance Capital Adequacy Test (LICAT) 2025 – Letter", type:"Letter", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:102, date:"2024-07-08", title:"Assurance on Capital, Leverage and Liquidity Returns Guideline – Clarifications", type:"Adjustments and clarifications", category:"Accounting and Disclosure", sector:"Banks / Life / P&C / Trust", status:"ACTIVE"},
  {n:103, date:"2024-07-05", title:"Modification to Capital Floor Transition schedule in CAR Chapter 1", type:"Regulatory notice", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:104, date:"2024-06-19", title:"Progress update on Data Collection Modernization (DCM) initiative", type:"Letter", category:"Supervisory Advisories", sector:"All FRFIs", status:"ACTIVE"},
  {n:105, date:"2024-06-18", title:"OSFI maintains Domestic Stability Buffer at 3.50% – Letter (2024)", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks", status:"ACTIVE"},
  {n:106, date:"2024-05-27", title:"OSFI consults on updates to the Liquidity Adequacy Requirements Guideline", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:107, date:"2024-03-11", title:"Reinforcing residential mortgage risk management practices", type:"Regulatory notice", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:108, date:"2024-02-22", title:"Consequential amendments to Guidelines B-10 and B-13 related to foreign branches", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:109, date:"2024-01-31", title:"Integrity and Security – Guideline", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Cooperative / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:110, date:"2024-01-31", title:"Integrity and Security – Letter", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Cooperative / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:111, date:"2024-01-01", title:"Minimum Capital Test – Guideline (2024)", type:"Guideline", category:"Capital Adequacy Requirements", sector:"P&C", status:"SUPERSEDED"},
  {n:112, date:"2023-12-14", title:"Minimum Capital Test 2024 – Adjustments and clarifications", type:"Adjustments and clarifications", category:"Capital Adequacy Requirements", sector:"P&C", status:"ACTIVE"},
  {n:113, date:"2023-12-08", title:"OSFI maintains Domestic Stability Buffer at 3.50% – Letter (2023)", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks", status:"ACTIVE"},
  {n:114, date:"2023-11-15", title:"Updates to Administrative Procedures for Late and Erroneous Filing Penalty Framework", type:"Letter", category:"Sound Business and Financial Practices", sector:"Life / P&C", status:"ACTIVE"},
  {n:115, date:"2023-11-08", title:"Domestic Stability Buffer – Decision Summary Note", type:"—", category:"Capital Adequacy Requirements", sector:"Banks", status:"ACTIVE"},
  {n:116, date:"2023-10-31", title:"OSFI upholds current LAR guideline treatment for HISA ETFs", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Foreign / Trust", status:"ACTIVE"},
  {n:117, date:"2023-10-24", title:"OSFI update on Canadian Dollar Offered Rate transition", type:"Letter", category:"—", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:118, date:"2023-10-20", title:"2024 Minimum Capital Test (MCT) – Letter (2023)", type:"Letter", category:"—", sector:"P&C", status:"ACTIVE"},
  {n:119, date:"2023-10-16", title:"OSFI response to Guideline B-20 consultation feedback on debt serviceability measures", type:"Consultation response", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Trust / Life / P&C", status:"ACTIVE"},
  {n:120, date:"2023-09-30", title:"Parental Stand-Alone (Solo) TLAC Framework for D-SIBs", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks", status:"ACTIVE"},
  {n:121, date:"2023-09-12", title:"OSFI finalizes Solo Capital and Solo TLAC guidelines", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Life", status:"ACTIVE"},
  {n:122, date:"2023-09-06", title:"Letter to industry on OSFI's next steps to implement new provisions of its mandate", type:"Letter", category:"—", sector:"All", status:"ACTIVE"},
  {n:123, date:"2023-08-31", title:"Appointed Actuary: Legal Requirements, Qualifications and Peer Review – Guideline (2023)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Life / P&C", status:"ACTIVE"},
  {n:124, date:"2023-07-19", title:"Update to LAR guideline review for wholesale funding sources with retail-like characteristics", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:125, date:"2023-06-30", title:"Technology and cyber incident reporting", type:"Letter", category:"Supervisory Advisories", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:126, date:"2023-06-20", title:"OSFI increases the Domestic Stability Buffer by 50 basis points", type:"Letter", category:"—", sector:"Banks", status:"ACTIVE"},
  {n:127, date:"2023-04-30", title:"Third-Party Risk Management Guideline (B-10)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:128, date:"2023-04-24", title:"OSFI response to draft Guideline B-10 consultation feedback", type:"Letter", category:"Sound Business and Financial Practices", sector:"All", status:"ACTIVE"},
  {n:129, date:"2023-04-01", title:"OSFI's Intelligence-led Cyber Resilience Testing (I-CRT) Framework", type:"Advisory", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:130, date:"2023-03-07", title:"OSFI issues final Guideline B-15 and responds to consultation feedback", type:"Letter", category:"—", sector:"Banks / Life / P&C / Trust", status:"ACTIVE"},
  {n:131, date:"2023-01-18", title:"Final updated Guideline E-16 – Participating account management – Letter (2023)", type:"Letter", category:"—", sector:"Life", status:"ACTIVE"},
  {n:132, date:"2023-01-18", title:"Participating account management and disclosure to policyholders – Guideline (2023)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Life", status:"ACTIVE"},
  {n:133, date:"2023-01-12", title:"Infosheet – Residential Mortgage Underwriting Practices and Procedures Guideline (B-20)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:134, date:"2022-12-31", title:"Increase of regulatory prudential limits – investment, lending and borrowing (P&C FRIs)", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Insurance Companies Act", status:"ACTIVE"},
  {n:135, date:"2022-12-14", title:"Revised OSFI Capital Ruling for Limited Recourse Capital Notes", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Life / P&C", status:"ACTIVE"},
  {n:136, date:"2022-11-30", title:"Assurance on Capital, Leverage and Liquidity Returns – Guideline (2022)", type:"Guideline", category:"Accounting and Disclosure", sector:"Banks / Life / P&C / Trust", status:"ACTIVE"},
  {n:137, date:"2022-11-30", title:"Assurance on Capital, Leverage and Liquidity Returns – Guideline at a glance (2022)", type:"Guideline at a glance", category:"Accounting and Disclosure", sector:"Banks / Life / P&C / Trust", status:"ACTIVE"},
  {n:138, date:"2022-11-09", title:"Final IFRS 17 Memoranda to The Appointed Actuary for FRIs", type:"Letter", category:"—", sector:"Life / P&C", status:"ACTIVE"},
  {n:139, date:"2022-11-07", title:"Guideline: Assurance on Capital, Leverage and Liquidity Returns – transmittal Letter", type:"Letter", category:"Accounting and Disclosure", sector:"Banks / Life / P&C / Trust", status:"ACTIVE"},
  {n:140, date:"2022-09-13", title:"Unwind of temporary leverage ratio exclusions, effective April 2023", type:"Letter", category:"—", sector:"Banks / Foreign / Trust", status:"ACTIVE"},
  {n:141, date:"2022-08-18", title:"Interim arrangements for regulatory capital and liquidity treatment of cryptoasset exposures", type:"Advisory", category:"Capital Adequacy Requirements", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:142, date:"2022-07-31", title:"Technology and Cyber Risk Management (Guideline B-13)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:143, date:"2022-07-13", title:"OSFI releases final Guideline B-13 – Letter (2022)", type:"Letter", category:"Prudential Limits and Restrictions", sector:"Banks / Foreign / Life / P&C", status:"ACTIVE"},
  {n:144, date:"2022-06-30", title:"Clarification on Treatment of Innovative Real Estate Secured Lending Products under B-20", type:"Advisory", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:145, date:"2022-06-28", title:"OSFI clarifies treatment of innovative real estate secured lending products under B-20 – Letter", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:146, date:"2022-06-22", title:"OSFI maintains Domestic Stability Buffer level at 2.50% – Letter (2022)", type:"Letter", category:"—", sector:"Banks", status:"ACTIVE"},
  {n:147, date:"2022-05-18", title:"Life Supplementary Quarterly Return – Letter (2022)", type:"Letter", category:"—", sector:"Life", status:"ACTIVE"},
  {n:148, date:"2022-05-16", title:"OSFI's expectations for CDOR Transition", type:"Letter", category:"—", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:149, date:"2022-04-30", title:"Accounting for Structured Settlements", type:"Guideline", category:"Accounting and Disclosure", sector:"P&C", status:"ACTIVE"},
  // PAGE 3
  {n:150, date:"2022-02-21", title:"Data Maintenance Expectations – Standardized Approach for Operational Risk Capital Data", type:"Implementation note", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:151, date:"2022-02-21", title:"Assessment Tool – Operational Risk Capital Data", type:"Assessment tool", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:152, date:"2022-02-16", title:"Release of final 2023 liquidity returns and consultation on draft NCCF reporting instructions", type:"Letter", category:"—", sector:"Banks / Trust", status:"ACTIVE"},
  {n:153, date:"2022-02-11", title:"Final Guideline B-2 and Guideline B-3", type:"Letter", category:"Prudential Limits and Restrictions", sector:"Banks / P&C", status:"ACTIVE"},
  {n:154, date:"2022-02-02", title:"Register of OSFI-Regulated Internationally Active Insurance Groups", type:"Letter", category:"—", sector:"Life / P&C", status:"ACTIVE"},
  {n:155, date:"2022-01-31", title:"Leverage Requirements – Guideline (2023)", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:156, date:"2022-01-14", title:"Building FRFI Awareness and Capability to Manage Climate-Related Financial Risks", type:"Letter", category:"—", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:157, date:"2021-12-20", title:"Use of the Standardized Approach for Operational Risk Capital by Category I SMSBs", type:"Letter", category:"—", sector:"Banks / Trust", status:"ACTIVE"},
  {n:158, date:"2021-12-17", title:"Minimum Qualifying Rate – Letter (2021)", type:"Letter", category:"—", sector:"All", status:"ACTIVE"},
  {n:159, date:"2021-12-10", title:"OSFI maintains Domestic Stability Buffer level at 2.50% – Letter (2021)", type:"Letter", category:"—", sector:"Banks", status:"ACTIVE"},
  {n:160, date:"2021-11-29", title:"Update on Basel III Implementation ahead of final rules release in January 2022", type:"Letter", category:"—", sector:"Banks / Trust", status:"ACTIVE"},
  {n:161, date:"2021-11-16", title:"Update on Development of New Approach for Segregated Fund Guarantee (SFG) Risk Capital", type:"Letter", category:"—", sector:"Life / P&C", status:"ACTIVE"},
  {n:162, date:"2021-10-12", title:"OSFI Summarizes Responses to its Climate Risk Discussion Paper", type:"Letter", category:"—", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:163, date:"2021-08-13", title:"Technology and Cyber Security Incident Reporting", type:"Advisory", category:"Supervisory Advisories", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:164, date:"2021-08-12", title:"Unwinding of certain temporary exclusions in leverage ratio exposure measures", type:"Letter", category:"—", sector:"Banks / Foreign / Trust", status:"ACTIVE"},
  {n:165, date:"2021-07-31", title:"Foreign Entities Operating in Canada on a Branch Basis – Guideline (2021)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Foreign Bank / Foreign Insurance / Life / P&C", status:"ACTIVE"},
  {n:166, date:"2021-06-28", title:"Foreign Entities Operating in Canada on a Branch Basis – Letter (2021)", type:"Letter", category:"Sound Business and Financial Practices", sector:"Foreign Bank / Life / P&C", status:"ACTIVE"},
  {n:167, date:"2021-06-22", title:"Transition from LIBOR", type:"Letter", category:"—", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:168, date:"2021-06-17", title:"OSFI sets the Domestic Stability Buffer level to 2.50% effective October 31, 2021", type:"Letter", category:"—", sector:"Banks", status:"ACTIVE"},
  {n:169, date:"2021-05-20", title:"Amendments to the minimum qualifying rate for uninsured mortgages – Letter (2021)", type:"Letter", category:"—", sector:"Banks", status:"ACTIVE"},
  {n:170, date:"2021-04-01", title:"OSFI Service Standards", type:"Letter", category:"—", sector:"All", status:"ACTIVE"},
  {n:171, date:"2021-01-29", title:"Assessment of Regulatory Capital Models for Deposit-Taking Institutions", type:"Implementation note", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:172, date:"2020-04-30", title:"Margin Requirements for Non-Centrally Cleared Derivatives – Guideline (2020)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:173, date:"2020-03-11", title:"Margin Requirements for Non-Centrally Cleared Derivatives – Letter (2020)", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:174, date:"2020-01-31", title:"Corporate Names, Registered Names and Trade Names", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Insurance Companies Act / Trust and Loan Companies Act", status:"ACTIVE"},
  {n:175, date:"2020-01-31", title:"Mergers Involving Foreign Entities", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Insurance Companies Act", status:"ACTIVE"},
  {n:176, date:"2020-01-31", title:"Control in Fact", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Insurance Companies Act / Trust and Loan Companies Act", status:"ACTIVE"},
  {n:177, date:"2020-01-31", title:"Liquidity Principles – Guideline (B-6) (2020)", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"Banks / Trust", status:"ACTIVE"},
  {n:178, date:"2020-01-20", title:"Implementation Timeline for Basel III Operational Risk Capital Requirements", type:"Letter", category:"—", sector:"Banks / Trust", status:"ACTIVE"},
  {n:179, date:"2019-12-31", title:"Foreign Bank Branch Deposit Requirement (Guideline A-10)", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Foreign Bank", status:"ACTIVE"},
  {n:180, date:"2019-12-05", title:"Changes to Guideline B-6 – Liquidity Principles", type:"Letter", category:"Prudential Limits and Restrictions", sector:"Banks / Trust", status:"ACTIVE"},
  {n:181, date:"2019-12-04", title:"Changes to the Foreign Bank Branch Deposit Requirement (Guideline A-10)", type:"Letter", category:"Capital Adequacy Requirements", sector:"Foreign Bank", status:"ACTIVE"},
  {n:182, date:"2019-11-01", title:"Large Exposure Limits for Domestic Systemically Important Banks – Guideline (2019)", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"Banks / Foreign / Trust", status:"ACTIVE"},
  {n:183, date:"2019-06-21", title:"Internal Model Oversight Framework", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Trust", status:"ACTIVE"},
  {n:184, date:"2019-05-31", title:"Interest Rate Risk Management – Guideline (B-12) (2019)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Trust", status:"ACTIVE"},
  {n:185, date:"2019-05-30", title:"Changes to Guideline B-12: Interest Rate Risk Management", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Trust", status:"ACTIVE"},
  {n:186, date:"2019-05-23", title:"Revised Covered Bond Limit Calculation", type:"Advisory", category:"—", sector:"Banks / Trust", status:"ACTIVE"},
  {n:187, date:"2019-04-30", title:"Net Stable Funding Ratio Disclosure Requirements – Guideline (2019)", type:"Guideline", category:"Accounting and Disclosure", sector:"Banks", status:"ACTIVE"},
  {n:188, date:"2019-04-11", title:"Changes to the Liquidity Adequacy Requirements Guideline", type:"Letter", category:"—", sector:"Banks / Trust", status:"ACTIVE"},
  {n:189, date:"2019-04-11", title:"Net Stable Funding Ratio Disclosure Requirements – Letter (2019)", type:"Letter", category:"Accounting and Disclosure", sector:"Banks", status:"ACTIVE"},
  {n:190, date:"2019-04-10", title:"Final Guideline B-2: Large Exposure Limits for D-SIBs", type:"Letter", category:"Prudential Limits and Restrictions", sector:"Banks / Foreign / Trust", status:"ACTIVE"},
  {n:191, date:"2019-03-31", title:"Residential Mortgage Insurance Underwriting Practices and Procedures – Guideline (B-21) (2019)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"P&C", status:"ACTIVE"},
  {n:192, date:"2019-03-01", title:"Revised Guideline B-21 – Letter (2019)", type:"Letter", category:"Sound Business and Financial Practices", sector:"P&C", status:"ACTIVE"},
  {n:193, date:"2018-11-30", title:"Asset Securitization – Guideline (2018)", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"Life / P&C", status:"ACTIVE"},
  {n:194, date:"2018-11-26", title:"Asset Securitization – Letter (2018)", type:"Letter", category:"—", sector:"All", status:"ACTIVE"},
  {n:195, date:"2018-09-30", title:"Corporate Governance – Guideline (2018)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Life / P&C / Trust", status:"ACTIVE"},
  {n:196, date:"2018-09-18", title:"Final Corporate Governance Guideline – Letter (2018)", type:"Letter", category:"—", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:197, date:"2018-08-14", title:"Amendments to Bank Act restrictions on use of words 'bank', 'banker' and 'banking'", type:"Letter", category:"—", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:198, date:"2018-05-31", title:"Total Loss Absorbing Capacity (TLAC) Disclosure Requirements – Guideline (2018)", type:"Guideline", category:"Accounting and Disclosure", sector:"Banks / Trust", status:"ACTIVE"},
  {n:199, date:"2018-05-28", title:"TLAC Disclosure and Capital Disclosure Requirements Guideline – Letter (2018)", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  // PAGE 4
  {n:200, date:"2018-04-30", title:"Total Loss Absorbing Capacity (TLAC) – Guideline (2018)", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:201, date:"2018-04-18", title:"Total Loss Absorbing Capacity (TLAC) Guideline – Letter (2018)", type:"Letter", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:202, date:"2018-03-31", title:"Life Insurance Capital Adequacy Test Public Disclosure Requirements", type:"Guideline", category:"Accounting and Disclosure", sector:"Life", status:"ACTIVE"},
  {n:203, date:"2018-03-08", title:"Guide to Intervention for Federally Regulated P&C Insurance Companies (Letter)", type:"Letter", category:"—", sector:"P&C", status:"ACTIVE"},
  {n:204, date:"2017-12-31", title:"Own Risk and Solvency Assessment (ORSA)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Life / P&C", status:"ACTIVE"},
  {n:205, date:"2017-12-31", title:"Regulatory Capital and Internal Capital Targets (2025)", type:"Guideline", category:"Capital Adequacy Requirements", sector:"Life / P&C", status:"ACTIVE"},
  {n:206, date:"2017-10-31", title:"Residential Mortgage Underwriting Practices and Procedures – Guideline (B-20) (2017)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:207, date:"2017-10-17", title:"Final Revised Guideline B-20: Residential Mortgage Underwriting Practices – Letter", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:208, date:"2017-09-30", title:"Enterprise-Wide Model Risk Management for Deposit-Taking Institutions – Guideline (2017)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Trust", status:"ACTIVE"},
  {n:209, date:"2017-06-30", title:"Advisory 2017-01 – Restrictions on use of words 'bank', 'banker' and 'banking'", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act", status:"ACTIVE"},
  {n:210, date:"2016-06-30", title:"IFRS 9 Financial Instruments and Disclosures", type:"Guideline", category:"Accounting and Disclosure", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:211, date:"2015-06-30", title:"Substantial Investments", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:212, date:"2015-06-30", title:"Substantial Investments – Appendix A.1", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:213, date:"2015-06-30", title:"Substantial Investments – Appendix A.2", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:214, date:"2015-06-30", title:"Substantial Investments – Appendix A.3", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:215, date:"2015-06-30", title:"Substantial Investments – Appendix A.4", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:216, date:"2015-06-30", title:"Substantial Investments – Appendix A.5", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:217, date:"2015-06-30", title:"Substantial Investments – Appendix A.6", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:218, date:"2015-06-30", title:"Substantial Investments – Appendix B.1", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:219, date:"2015-06-30", title:"Substantial Investments – Appendix B.2", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:220, date:"2015-06-30", title:"Substantial Investments – Appendix B.3", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:221, date:"2015-06-30", title:"Substantial Investments – Appendix B.4", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:222, date:"2015-06-30", title:"Substantial Investments – Appendix B.5", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:223, date:"2015-06-30", title:"Substantial Investments – Appendix B.6", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:224, date:"2015-06-30", title:"Legislative Framework for Foreign Banks", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act", status:"ACTIVE"},
  {n:225, date:"2015-01-30", title:"Derivatives Sound Practices – Letter (2015)", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:226, date:"2015-01-05", title:"Revised Life Insurance Capital Framework – Standard Approach", type:"Letter", category:"—", sector:"Life", status:"ACTIVE"},
  {n:227, date:"2014-11-30", title:"Derivatives Sound Practices – Guideline (2014)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:228, date:"2014-11-30", title:"Regulatory Compliance Management (RCM) – Guideline (E-13) (2014)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:229, date:"2014-11-13", title:"Revised Guideline E-13 – Regulatory Compliance Management – Letter (2014)", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:230, date:"2013-06-30", title:"Settlement Risk in Foreign Exchange Transactions – Guideline (2013)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Trust", status:"ACTIVE"},
  {n:231, date:"2013-06-06", title:"Settlement Risk in Foreign Exchange Transactions – Letter (2013)", type:"Letter", category:"Sound Business and Financial Practices", sector:"Banks / Trust", status:"ACTIVE"},
  {n:232, date:"2013-02-28", title:"Earthquake Exposure Sound Practices – Letter (2013)", type:"Letter", category:"Prudential Limits and Restrictions", sector:"P&C", status:"ACTIVE"},
  {n:233, date:"2013-02-28", title:"Earthquake Exposure Sound Practices – Guideline (2013)", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"P&C", status:"ACTIVE"},
  {n:234, date:"2013-01-31", title:"Business and Powers – Ownership Interests in Commodities", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:235, date:"2010-12-24", title:"Guidance for Reinsurance Security Agreements – Letter (2010)", type:"Letter", category:"—", sector:"Life / P&C", status:"ACTIVE"},
  {n:236, date:"2010-10-31", title:"Internal Capital Adequacy Assessment Process (ICAAP) – Guideline (E-19) (2010)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Trust", status:"ACTIVE"},
  {n:237, date:"2010-08-09", title:"Reinsurance Trust Agreements", type:"Letter", category:"—", sector:"All", status:"ACTIVE"},
  {n:238, date:"2010-06-30", title:"Mortgage Insurance", type:"Implementation note", category:"—", sector:"Banks / Life / P&C / Trust", status:"ACTIVE"},
  {n:239, date:"2010-01-31", title:"Role of the Independent Actuary", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Life", status:"ACTIVE"},
  {n:240, date:"2009-12-31", title:"Stress Testing – Guideline (E-18) (2009)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Life / P&C / Trust", status:"ACTIVE"},
  {n:241, date:"2009-12-02", title:"Stress Testing – Letter (2009)", type:"Letter", category:"—", sector:"All", status:"ACTIVE"},
  {n:242, date:"2008-12-31", title:"Alternative Method for Life Insurance Companies – Segregated Fund Guarantee Capital (Prescribed Factors)", type:"Advisory", category:"Capital Adequacy Requirements", sector:"Life", status:"ACTIVE"},
  {n:243, date:"2008-08-31", title:"Undertaking for the sharing of information with insurers", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Trust", status:"ACTIVE"},
  {n:244, date:"2008-02-29", title:"Background Checks on Directors and Senior Management of FREs – Guideline (2008)", type:"Guideline", category:"Sound Business and Financial Practices", sector:"Banks / Foreign / Life / P&C / Trust", status:"ACTIVE"},
  {n:245, date:"2007-09-30", title:"Insurance in Canada of Risks", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Life", status:"ACTIVE"},
  {n:246, date:"2006-01-31", title:"Data Maintenance at IRB Institutions", type:"Implementation note", category:"Capital Adequacy Requirements", sector:"Bank Holding / Banks / Trust", status:"ACTIVE"},
  {n:247, date:"2006-01-31", title:"Collateral Management Principles for IRB Institutions", type:"Implementation note", category:"Capital Adequacy Requirements", sector:"Banks / Trust / Bank Holding", status:"ACTIVE"},
  {n:248, date:"2006-01-31", title:"Oversight Expectations for IRB Institutions", type:"Implementation note", category:"Capital Adequacy Requirements", sector:"Banks / Trust / Bank Holding", status:"ACTIVE"},
  {n:249, date:"2006-01-31", title:"The Use of Ratings and Estimates of Default and Loss at IRB Institutions", type:"Implementation note", category:"Capital Adequacy Requirements", sector:"Banks / Trust / Bank Holding", status:"ACTIVE"},
  // PAGE 5
  {n:250, date:"2006-01-31", title:"Risk Quantification at IRB Institutions", type:"Implementation note", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:251, date:"2006-01-31", title:"Validating Risk Rating Systems at IRB Institutions", type:"Implementation note", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:252, date:"2006-01-31", title:"Foreign DTI Subsidiary IRB Self-Assessment Instructions", type:"Instructions", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:253, date:"2006-01-31", title:"AIRB Self-Assessment Instructions", type:"Instructions", category:"Capital Adequacy Requirements", sector:"Banks / Trust", status:"ACTIVE"},
  {n:254, date:"2003-08-31", title:"Large Exposure Limits – 2003 (Life Insurance)", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"Life", status:"ACTIVE"},
  {n:255, date:"2003-05-31", title:"Pledging", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"Banks / Life / P&C / Trust", status:"ACTIVE"},
  {n:256, date:"2003-04-30", title:"Capital Structure – Declaration and payment of dividends", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:257, date:"2003-02-28", title:"Business and Powers – Commercial lending limit", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Cooperative / Insurance / Trust", status:"ACTIVE"},
  {n:258, date:"2002-11-30", title:"Business and Powers – Information respecting a customer", type:"Regulatory and legislative advisory", category:"Regulatory and legislative", sector:"Bank Act / Trust", status:"ACTIVE"},
  {n:259, date:"2001-10-31", title:"Materiality Criteria for Related Party Transactions – Guidance note (2001)", type:"Guidance note", category:"—", sector:"Life", status:"ACTIVE"},
  {n:260, date:"2001-10-25", title:"Materiality Criteria for Related Party Transactions – Letter (2001)", type:"Letter", category:"—", sector:"Life", status:"ACTIVE"},
  {n:261, date:"2001-03-31", title:"Large Exposure Limits (Guidance Note)", type:"Guidance note", category:"Prudential Limits and Restrictions", sector:"Banks / Foreign / Trust", status:"ACTIVE"},
  {n:262, date:"2000-01-31", title:"Asset Securitization by Foreign Bank Branches", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"Foreign Bank", status:"ACTIVE"},
  {n:263, date:"1999-06-30", title:"Financial Statements Requirements – Canadian Mutual Company Demutualizations", type:"Guidance note", category:"—", sector:"Life", status:"ACTIVE"},
  {n:264, date:"1999-05-31", title:"Expert Opinions and Report – Canadian Company Demutualizations", type:"Guidance note", category:"—", sector:"Life", status:"ACTIVE"},
  {n:265, date:"1999-05-31", title:"Materiality Criteria for Related Party Transactions – Bulletin (1999)", type:"Bulletin", category:"Prudential Limits and Restrictions", sector:"Banks / Trust", status:"ACTIVE"},
  {n:266, date:"1997-02-28", title:"Securities Lending – Life Insurance Companies – Guideline (1997)", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"Life", status:"ACTIVE"},
  {n:267, date:"1996-12-31", title:"Use of Depositories by Insurance Companies", type:"Bulletin", category:"Sound Business and Financial Practices", sector:"Life / P&C", status:"ACTIVE"},
  {n:268, date:"1996-09-30", title:"Securities Lending – Deposit-taking Institutions – Guideline (1996)", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"Banks / Foreign / Trust", status:"ACTIVE"},
  {n:269, date:"1996-09-30", title:"Securities Lending – Property and Casualty Insurance Companies – Guideline (1996)", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"P&C", status:"ACTIVE"},
  {n:270, date:"1994-12-31", title:"Large Exposure Limits – 1994", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"Banks / Foreign / Trust", status:"ACTIVE"},
  {n:271, date:"1993-12-31", title:"Materiality Criteria for Related Party Transactions of P&C Insurance Companies – Bulletin (1993)", type:"Bulletin", category:"Prudential Limits and Restrictions", sector:"P&C", status:"ACTIVE"},
  {n:272, date:"1993-10-31", title:"Materiality Criteria for Related Party Transactions of Life Insurance Companies – Bulletin (1993)", type:"Bulletin", category:"Prudential Limits and Restrictions", sector:"Life", status:"ACTIVE"},
  {n:273, date:"1993-09-30", title:"Commercial Lending Restrictions – Foreign Life Insurance Companies and Foreign Fraternal Benefit Societies", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"Life", status:"ACTIVE"},
  {n:274, date:"1992-06-30", title:"Commercial Lending Criteria", type:"Guideline", category:"Prudential Limits and Restrictions", sector:"Life / Trust", status:"ACTIVE"},
  {n:275, date:"", title:"Frequently asked questions – Basel III reforms", type:"Frequently asked questions", category:"—", sector:"Banks / Trust", status:"ACTIVE"},
  {n:276, date:"", title:"Pillar 3 Disclosure Expectations", type:"Guideline", category:"Accounting and Disclosure", sector:"Banks / Trust", status:"ACTIVE"},
];

const STATUS_COLORS = {
  ACTIVE: "bg-green-100 text-green-800",
  FUTURE: "bg-blue-100 text-blue-800",
  SUPERSEDED: "bg-yellow-100 text-yellow-800",
  CONSULTATION: "bg-purple-100 text-purple-800",
};

const TYPE_COLORS = {
  "Guideline": "bg-indigo-100 text-indigo-700",
  "Letter": "bg-gray-100 text-gray-700",
  "Advisory": "bg-orange-100 text-orange-700",
  "Regulatory notice": "bg-red-100 text-red-700",
  "Regulatory and legislative advisory": "bg-red-100 text-red-700",
  "Frequently asked questions": "bg-teal-100 text-teal-700",
  "Discussion paper": "bg-purple-100 text-purple-700",
  "Consultative document": "bg-purple-100 text-purple-700",
  "Implementation note": "bg-cyan-100 text-cyan-700",
  "Assessment tool": "bg-lime-100 text-lime-700",
  "Instructions": "bg-cyan-100 text-cyan-700",
};

const UNIQUE_TYPES = [...new Set(ALL_DOCS.map(d => d.type))].sort();
const UNIQUE_STATUS = ["ACTIVE", "FUTURE", "SUPERSEDED", "CONSULTATION"];

export default function App() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 50;

  const filtered = useMemo(() => {
    return ALL_DOCS.filter(d => {
      const q = search.toLowerCase();
      const matchSearch = !q || d.title.toLowerCase().includes(q) || d.sector.toLowerCase().includes(q) || d.category.toLowerCase().includes(q) || d.type.toLowerCase().includes(q);
      const matchType = typeFilter === "All" || d.type === typeFilter;
      const matchStatus = statusFilter === "All" || d.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [search, typeFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const counts = useMemo(() => ({
    total: ALL_DOCS.length,
    active: ALL_DOCS.filter(d => d.status === "ACTIVE").length,
    future: ALL_DOCS.filter(d => d.status === "FUTURE").length,
    superseded: ALL_DOCS.filter(d => d.status === "SUPERSEDED").length,
    consultation: ALL_DOCS.filter(d => d.status === "CONSULTATION").length,
    guidelines: ALL_DOCS.filter(d => d.type === "Guideline").length,
  }), []);

  const resetPage = () => setPage(1);

  return (
    <div style={{fontFamily:"system-ui,sans-serif", fontSize:13, background:"#f8fafc", minHeight:"100vh", padding:16}}>
      {/* Header */}
      <div style={{background:"#1e3a5f", color:"white", borderRadius:8, padding:"12px 16px", marginBottom:12}}>
        <div style={{fontSize:15, fontWeight:700, marginBottom:2}}>OSFI Guidance Library — Complete Scrape Manifest</div>
        <div style={{fontSize:11, opacity:0.8}}>Source: osfi-bsif.gc.ca/en/guidance/guidance-library · All 6 pages scraped · March 23, 2026</div>
      </div>

      {/* Stats */}
      <div style={{display:"flex", gap:8, marginBottom:12, flexWrap:"wrap"}}>
        {[
          {label:"Total Documents", val:counts.total, bg:"#1e3a5f", color:"white"},
          {label:"Active", val:counts.active, bg:"#dcfce7", color:"#166534"},
          {label:"Future", val:counts.future, bg:"#dbeafe", color:"#1e40af"},
          {label:"Superseded", val:counts.superseded, bg:"#fef9c3", color:"#854d0e"},
          {label:"Consultation", val:counts.consultation, bg:"#f3e8ff", color:"#6b21a8"},
          {label:"Guidelines", val:counts.guidelines, bg:"#e0e7ff", color:"#3730a3"},
        ].map(s => (
          <div key={s.label} style={{background:s.bg, color:s.color, borderRadius:6, padding:"6px 12px", fontWeight:600, fontSize:12}}>
            <span style={{fontSize:18, fontWeight:700, display:"block", lineHeight:1}}>{s.val}</span>
            {s.label}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{display:"flex", gap:8, marginBottom:10, flexWrap:"wrap", alignItems:"center"}}>
        <input
          placeholder="Search title, sector, category, type..."
          value={search}
          onChange={e => { setSearch(e.target.value); resetPage(); }}
          style={{flex:1, minWidth:220, padding:"6px 10px", border:"1px solid #cbd5e1", borderRadius:6, fontSize:12}}
        />
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); resetPage(); }}
          style={{padding:"6px 8px", border:"1px solid #cbd5e1", borderRadius:6, fontSize:12}}>
          <option value="All">All Statuses</option>
          {UNIQUE_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); resetPage(); }}
          style={{padding:"6px 8px", border:"1px solid #cbd5e1", borderRadius:6, fontSize:12}}>
          <option value="All">All Types</option>
          {UNIQUE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <span style={{fontSize:11, color:"#64748b", whiteSpace:"nowrap"}}>{filtered.length} results</span>
      </div>

      {/* Table */}
      <div style={{background:"white", borderRadius:8, border:"1px solid #e2e8f0", overflow:"hidden"}}>
        <table style={{width:"100%", borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"#f1f5f9", borderBottom:"2px solid #e2e8f0"}}>
              {["#","Date","Title","Type","Category","Sector","Status"].map(h => (
                <th key={h} style={{padding:"8px 10px", textAlign:"left", fontWeight:600, fontSize:11, color:"#475569", whiteSpace:"nowrap"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((d, i) => (
              <tr key={d.n} style={{borderBottom:"1px solid #f1f5f9", background: i % 2 === 0 ? "white" : "#fafafa"}}>
                <td style={{padding:"6px 10px", color:"#94a3b8", fontSize:11, whiteSpace:"nowrap"}}>{d.n}</td>
                <td style={{padding:"6px 10px", whiteSpace:"nowrap", fontSize:11, color:"#64748b"}}>{d.date || "—"}</td>
                <td style={{padding:"6px 10px", fontSize:12, maxWidth:360}}>
                  <span title={d.title}>{d.title.length > 85 ? d.title.slice(0,85)+"…" : d.title}</span>
                </td>
                <td style={{padding:"6px 10px", whiteSpace:"nowrap"}}>
                  <span style={{fontSize:10, padding:"2px 6px", borderRadius:4, fontWeight:500, ...(TYPE_COLORS[d.type] ? {} : {}), background: TYPE_COLORS[d.type]?.split(" ")[0]?.replace("bg-","")?.includes("-") ? undefined : "#f1f5f9", color:"#374151"}}
                    className={TYPE_COLORS[d.type] || ""}>
                    {d.type.length > 20 ? d.type.slice(0,20)+"…" : d.type}
                  </span>
                </td>
                <td style={{padding:"6px 10px", fontSize:11, color:"#64748b", maxWidth:160}}>
                  <span title={d.category}>{d.category.length > 22 ? d.category.slice(0,22)+"…" : d.category}</span>
                </td>
                <td style={{padding:"6px 10px", fontSize:11, color:"#64748b", maxWidth:140}}>
                  <span title={d.sector}>{d.sector.length > 20 ? d.sector.slice(0,20)+"…" : d.sector}</span>
                </td>
                <td style={{padding:"6px 10px"}}>
                  <span style={{fontSize:10, padding:"2px 7px", borderRadius:10, fontWeight:600}} className={STATUS_COLORS[d.status] || "bg-gray-100 text-gray-600"}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{display:"flex", gap:6, marginTop:10, justifyContent:"center", alignItems:"center"}}>
          <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
            style={{padding:"4px 10px", borderRadius:5, border:"1px solid #cbd5e1", background: page===1?"#f1f5f9":"white", cursor: page===1?"default":"pointer", fontSize:12}}>
            ← Prev
          </button>
          <span style={{fontSize:12, color:"#64748b"}}>Page {page} of {totalPages} · {filtered.length} items</span>
          <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}
            style={{padding:"4px 10px", borderRadius:5, border:"1px solid #cbd5e1", background: page===totalPages?"#f1f5f9":"white", cursor: page===totalPages?"default":"pointer", fontSize:12}}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

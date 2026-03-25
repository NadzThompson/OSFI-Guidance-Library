# Interim arrangements for the regulatory capital and liquidity treatment of cryptoasset exposures

**Type:** Advisory | **Category:** Capital Adequacy Requirements | **Date:** Effective Date Q2 2023 | **Effective:** Effective Date Q2 2023 | **Sector:** Banks, Foreign Bank Branches, Life Insurance and Fraternal Companies, Property and Casualty Companies, Trust and Loan Companies | **Status:** FINAL CURRENT | **Tier:** 1

---

- OSFI announces interim approach to cryptoassets

Consultation on OSFI’s draft crypto-asset guidelines closed on September 20, 2023. OSFI has finalized guidance for Capital and Liquidity Treatment of Crypto-asset Exposures – Banking Guideline (2026) and Capital Treatment of Crypto-asset Exposures – Insurance Guideline (2026) . This advisory will remain effective until the end of fiscal Q4 2025.

## 1. Scope of application

This advisory clarifies the interim regulatory capital and liquidity treatment of Deposit Taking Institutions’ (DTIs) and Insurers’ exposures to cryptoassets Footnote 1 . It applies to all Federally Regulated Financial Institutions (FRFIs) and complements the following OSFI guidelines: Capital Adequacy Requirements (CAR) , Leverage Requirements (LR) , Liquidity Adequacy Requirements (LAR) , Foreign Bank Branch Deposit Requirement (A-10) , Life Insurance Capital Adequacy Test (LICAT) , Minimum Capital Test (MCT) , and Mortgage Insurer Capital Adequacy Test (MICAT) .

The advisory defines and categorizes cryptoasset exposures, then it outlines DTI credit risk, counterparty credit risk, leverage, market risk, liquidity risk, and the foreign bank branch deposit treatments. The capital requirements for insurer cryptoasset exposures are then clarified, including collateral recognition, and considerations for foreign insurance branches. The last section defines exposure limits for all FRFIs.

The scope of this advisory is limited to the capital and liquidity treatment of a FRFI’s exposures to cryptoassets. The advisory does not address other issues, including whether a FRFI is permitted under the Bank Act , Insurance Companies Act , or Trust and Loan Companies Act to issue any particular cryptoasset, or to acquire or hold a controlling or substantial investment in entities that engage in this activity. This advisory sets out OSFI’s expectations as to when FRFIs should notify their lead supervisor if they intend to have exposures to cryptoassets. Where a FRFI intends to engage (directly or via a subsidiary) in other cryptoasset activities, OSFI’s expectation is that the FRFI will notify its lead supervisor and provide any information requested by OSFI that will allow OSFI to assess the safety and soundness, and risk implications of such activities.

## 2. Definition of cryptoassets and cryptoasset exposures

Cryptoassets are digital assets that depend primarily on cryptography and distributed ledger or similar technology. Footnote 2

Cryptoasset exposures include direct exposures to cryptoassets, as well as any indirect exposures whose value or risk is substantially determined by the value of one or more cryptoassets. These indirect exposures include all instruments referencing cryptoassets, such as (but not limited to) derivatives, mutual funds, exchange traded funds (ETFs), units of trusts and partnerships, or shares in a corporation. OSFI expects FRFIs to take a prudent approach to the interpretation of what constitutes a cryptoasset exposure.

## 3. Categorization of cryptoassets

Cryptoassets are broadly categorized into two groups – Group 1 and Group 2. Group 1 cryptoassets are those that meet the following set of criteria Footnote 3 :

1. They are digital representations of traditional assets Footnote 4 using cryptography, distributed ledger technology or similar technology to record ownership.
2. A legal opinion has been obtained confirming that all rights, obligations and interests arising from the cryptoasset are: clearly defined, legally enforceable in all relevant jurisdictions, and consistent with the rights, obligations, and interests associated with comparable traditional assets.
3. A legal opinion has been obtained confirming settlement finality of the cryptoasset.
4. All entities performing transfer, settlement or redeemability functions of the cryptoasset follow robust risk governance and risk control policies and practices to address all significant risks Footnote 5 .
5. All entities that execute redemptions, transfers, storage, or settlement finality of the cryptoasset, or manage or invest reserve assets, are regulated and supervised, or subject to appropriate risk management standards. For a stablecoin to receive Group 1 treatment, the issuer must be prudentially regulated and subject to capital and liquidity requirements that are comparable to those of OSFI.

Group 2 cryptoassets are those that fail to meet one or more of the above criteria.

A cryptoasset exposure is a Group 1 exposure if its value or risk is substantially determined by the value of a Group 1 cryptoasset. Otherwise, it is a Group 2 cryptoasset exposure.

The above constitutes a simplified categorization relative to the second consultation paper on the prudential treatment of cryptoassets published by the Basel Committee on Banking Supervision (BCBS) in June 2022. Footnote 6

### 4.1 Credit risk (CAR Guideline)

Group 1 cryptoasset exposures should receive a credit risk capital treatment consistent with that of comparable traditional assets. Footnote 7

Group 2 cryptoasset exposures in the banking book should be deducted from Common Equity Tier 1 (CET1) capital. As short positions have unlimited risk, short positions in cryptoasset exposures are not permitted in the banking book, consistent with the treatment of other short positions. The treatment of Group 2 cryptoasset exposures in the trading book is outlined in Section 4.4 below.

No collateral value may be ascribed to Group 2 cryptoassets (i.e. such cryptoasset collateral is subject to a 100% haircut). Collateralized transactions (such as securities financing transactions) secured by cryptoasset exposures should be capitalized as a direct unsecured exposure to the counterparty.

### 4.2 Counterparty credit risk (CAR Guideline)

Counterparty credit risk exposure amounts for derivative transactions should be computed in accordance with Chapter 7 of the 2023 CAR Guideline (effective Q2/2023), unless otherwise specified below.

#### Add-ons, Netting and Hedging Sets

Derivatives referencing Group 1 cryptoassets may be subject to the same rules to determine counterparty credit risk exposures as non-tokenised traditional assets only after an institution notifies and receives written agreement from OSFI Footnote 8 . Until such written agreement is provided by OSFI, such derivatives should be treated as Group 2 cryptoassets.

Derivatives referencing Group 2 cryptoassets should be placed into their own netting set (a netting set is defined in paragraph 3 of Chapter 7 of the 2023 CAR Guideline).

The calculation of the potential future exposure (PFE) for derivatives referencing indirect cryptoasset exposures should follow the treatment under the equity derivatives section of Chapter 7 of the 2023 CAR Guideline. In addition, a supervisory factor of 40% should be used for these derivatives. The correlation and options volatility amounts should be set at 50% and 150% Footnote 9 , respectively.

To calculate the PFE add-on for derivatives directly referencing Group 2 cryptoassets, a new asset class has been created called “Group 2 Crypto”. A perfect correlation to all other asset classes is assumed, with the Group 2 Crypto asset class possessing the following characteristics:

1. The mathematical structure is the same as that used for the foreign exchange (FX) asset class but uses different supervisory factors.
2. There are separate hedging sets for each cryptoasset priced in applicable fiat currencies (e.g., “Bitcoin in USD”, “Bitcoin in EUR”, “Tether in USD”) and offsetting between cryptoasset/fiat currency pairs or pairs of cryptoassets is not permitted.
3. The supervisory factor for all cryptoasset/fiat currency pairs and cryptoasset/cryptoasset pairs is set at 40% and the options volatility amount at 150%.
4. The calculation of the adjusted notional is set to the notional amount of the cryptoasset leg of the pair expressed in the domestic currency. For the case of cryptoasset A against cryptoasset B, the larger of the two adjusted notional amounts applies.
5. The calculation of the supervisory delta adjustment and the maturity factor is the same as for the other asset classes.
6. The aggregation of the hedging set add-ons is the same as for the other asset classes (i.e., summing them up).

### 4.3 Leverage requirements (LR Guideline)

Cryptoasset exposures are treated consistent with other leverage exposures, where the exposure measure for the leverage ratio generally follows gross accounting values, with separate treatments defined in the Leverage Requirements Guideline for derivatives, securities financing transactions, and other off-balance sheet items.

### 4.4 Market risk (CAR Guideline)

Institutions may only apply the market risk framework to cryptoasset exposures if they are approved by OSFI to apply the market risk framework and have notified OSFI about how cryptoasset exposures will be treated within the framework (e.g., standardized approach vs. internal model approach, equity vs. commodity risk factor, etc.). Until such time, cryptoasset exposures should be treated under the credit risk framework (Section 4.1 above) as banking book exposures.

OSFI expects that institutions intending to trade cryptoassets take into account the following elements as part of their decision-making process and risk management of these exposures:

- The ability to trade on regulated or registered exchanges; trading volumes and market capitalization; timing and settlements of transactions across exchanges and platforms; data availability including historical periods of stress and alternative calibration methods if such data is unavailable; and the existence of a liquid two-way market.
- The reliability and effectiveness of hedging and netting arrangements including conservative approaches that address any potential limitations in such arrangements (e.g., uncertain correlations in periods of stress and high volatility); and on-going monitoring of price correlation and volatility, including appropriate capital allocated to capture any residual risk.
- The stress period utilized to calculate capital requirements. Specifically, taking into account portfolio size and exposures, institutions should ensure that the stress period utilized to calculate the capital requirements of cryptoasset exposures is appropriate for such exposures so as to generate reasonable proxies for the cryptoasset exposures. Institutions should also consider whether cryptoasset positions in the trading book should be treated as a separate sub-portfolio with higher multiplication factors relative to those applied to other trading book positions according to Section 9.11 of Chapter 9 of the 2023 CAR Guideline.

Institutions should only consider hedging or diversification benefits between instruments referencing the same cryptoasset. Open unhedged exposures which are outside of any hedging relationship with offsetting transactions should receive a 100% capital charge under the market risk framework. Basis risk resulting from different forms of the same cryptoasset being referenced in a hedging relationship (e.g., crypto ETF positions hedged with futures referencing the underlying) should be captured, tracked and capitalized by institutions.

### 4.5 Liquidity treatment of cryptoasset exposures (LAR Guideline)

The liquidity coverage ratio (LCR), net stable funding ratio (NSFR), and net cumulative cash flow (NCCF) requirements are set out below.

#### Cryptoasset exposures held as assets

Group 1 cryptoasset exposures may qualify for liquidity treatment that is consistent with their equivalent non-tokenized asset as set out in the LAR Guideline (LCR, NCCF and NSFR) with a treatment that is based on the earliest possible maturity. Thus holdings of Group 1 cryptoassets will only be eligible as High Quality Liquid Assets (HQLA) or Eligible Unencumbered Liquid Assets (EULA) if both i) they are tokenized versions of a traditional asset that itself would qualify as HQLA or EULA and ii) the tokenized asset itself meets the HQLA/EULA eligibility criteria.

All other cryptoasset exposures should not contribute any liquidity value and should be subject to a 100% haircut in the LCR and NCCF, and 100% Required Stable Funding (RSF) factor under the NSFR.

#### Cryptoasset exposures issued as liabilities

Funding from Group 1 cryptoassets should qualify for a liquidity treatment that is consistent with its equivalent non-tokenized liability as set out in the LAR Guideline (LCR, NCCF and NSFR), with a treatment that is based on i) the earliest possible redemption, and ii) the identity of the holder (i.e. the issuing institution must at all times be able to identify the holder of the cryptoasset). In addition, Group 1 cryptoassets are not permitted to be recognized as a stable retail deposit.

All other funding from the issuance of cryptoassets (including liabilities where the ultimate holder is not identified) should not contribute any stable funding credit in the NSFR and, under the LCR and NCCF, should be subject to 100% run-off factors.

Funding received from cryptoasset issuers, or any other exposures associated with the reserve assets of a stablecoin, should be treated as an exposure to a financial institution (and so do not contribute any stable funding credit in the NSFR, and should be subject to 100% run-off factors in the LCR and NCCF).

### 4.6 Foreign bank branch deposit requirement (Guideline A-10)

Cryptoasset exposures should not be considered qualifying assets under Guideline A-10, and therefore cannot be included in the calculation of the foreign bank branch deposit.

## 5. Treatment of insurer cryptoasset exposures

Group 1 cryptoasset exposures should receive a capital treatment consistent with that of comparable traditional assets, including credit, market and/or other risks. Footnote 10

Group 2 cryptoasset exposures, including the absolute value of short positions, the full notional amount of long option positions and the full notional amount of long forward contracts should be deducted from capital available (for property and casualty, and mortgage insurers) and Tier 1 capital (for life insurers). Footnote 11

Collateral used as a financial resource to reduce capital requirements cannot include Group 2 cryptoasset exposures (e.g., collateral used for unregistered reinsurance).

### 5.1 Foreign insurance branch requirement

Foreign insurance branches are not permitted to vest cryptoasset exposures.

## 6. Group 2 cryptoasset exposure limits

Group 2 cryptoasset exposures are subject to two limits expressed as a percentage of Tier 1 capital (for DTIs and life insurers) or as a percentage of capital available (for property and casualty, and mortgage insurers). Specifically, FRFIs should notify OSFI in writing if:

1. Total gross positions Footnote 12 across all Group 2 cryptoasset exposures exceed 1% of the above capital amount, or
2. Total net short positions Footnote 13 across all Group 2 cryptoasset exposures exceed 0.1% of the above capital amount.

The written notification to OSFI should include the size of the positions, the cryptoasset exposures in question, and the amount of capital held for the positions. OSFI may impose higher capital requirements for large positions.

Footnotes Footnote 1 Excluding exposures to central bank digital currencies (CBDCs), which are outside of the scope of this advisory. Return to footnote 1 Footnote 2 As defined in https://www.fsb.org/wp-content/uploads/P131020-3.pdf . For greater clarity, Bitcoin and Ether are the two most prominent cryptoassets as of this advisory’s publication date; however this definition also includes stablecoins, non-fungible-tokens (NFTs), and other distributed ledger platforms such as Cardano and Solana. Return to footnote 2 Footnote 3 OSFI reserves the ability to modify these criteria for any reason including but not limited to reflect ongoing developments in the cryptoassets market and to reflect evolving international standards. If warranted, OSFI may also apply an exposure limit to Group 1 cryptoassets. Return to footnote 3 Footnote 4 Traditional assets are those assets that are captured within the relevant capital framework and not classified as cryptoassets. Return to footnote 4 Footnote 5 Risks include, but are not limited to, credit, market, and liquidity risks; operational risk (including outsourcing, fraud, and cyber risk) and risk of loss of data; and various non-financial risks, such as data integrity, operational resilience (i.e., operational reliability and capacity), third-party risk management, and Anti Money Laundering/ Countering the Financing of Terrorism (AML/CFT). Return to footnote 5 Footnote 6 Prudential treatment of cryptoasset exposures - second consultation (https://www.bis.org/bcbs/publ/d533.htm) Return to footnote 6 Footnote 7 For example, a tokenised corporate bond will be subject to the same treatment as a comparable traditional corporate bond, and a tokenized bank deposit will be subject to the same treatment as a comparable traditional bank deposit. Return to footnote 7 Footnote 8 Where OSFI notification and/or approval is required in this document, institutions should understand these statements refer to notifying and/or receiving approval from the institution’s lead supervisor, including providing the lead supervisor with relevant supporting materials. Return to footnote 8 Footnote 9 For derivatives referencing derivatives of cryptoasset exposures, institutions require approval from OSFI on the appropriate treatment, which may be higher than the factors listed here. Return to footnote 9 Footnote 10 For example, a tokenised corporate bond will be subject to the same capital requirements as a comparable traditional corporate bond. Return to footnote 10 Footnote 11 Insurers should contact OSFI for the capital treatment of cryptoasset exposures arising in insurance products (e.g., embedded derivative or other exposures). Return to footnote 11 Footnote 12 For this purpose, gross positions are defined as the greater of the absolute value of long and short positions. Return to footnote 12 Footnote 13 Any hedging or diversification benefit should be considered only between instruments referencing the same cryptoasset according to Section 4.4 above. Return to footnote 13

## Footnotes

Excluding exposures to central bank digital currencies (CBDCs), which are outside of the scope of this advisory.

Return to footnote 1

As defined in https://www.fsb.org/wp-content/uploads/P131020-3.pdf . For greater clarity, Bitcoin and Ether are the two most prominent cryptoassets as of this advisory’s publication date; however this definition also includes stablecoins, non-fungible-tokens (NFTs), and other distributed ledger platforms such as Cardano and Solana.

Return to footnote 2

OSFI reserves the ability to modify these criteria for any reason including but not limited to reflect ongoing developments in the cryptoassets market and to reflect evolving international standards. If warranted, OSFI may also apply an exposure limit to Group 1 cryptoassets.

Return to footnote 3

Traditional assets are those assets that are captured within the relevant capital framework and not classified as cryptoassets.

Return to footnote 4

Risks include, but are not limited to, credit, market, and liquidity risks; operational risk (including outsourcing, fraud, and cyber risk) and risk of loss of data; and various non-financial risks, such as data integrity, operational resilience (i.e., operational reliability and capacity), third-party risk management, and Anti Money Laundering/ Countering the Financing of Terrorism (AML/CFT).

Return to footnote 5

Prudential treatment of cryptoasset exposures - second consultation (https://www.bis.org/bcbs/publ/d533.htm)

Return to footnote 6

For example, a tokenised corporate bond will be subject to the same treatment as a comparable traditional corporate bond, and a tokenized bank deposit will be subject to the same treatment as a comparable traditional bank deposit.

Return to footnote 7

Where OSFI notification and/or approval is required in this document, institutions should understand these statements refer to notifying and/or receiving approval from the institution’s lead supervisor, including providing the lead supervisor with relevant supporting materials.

Return to footnote 8

For derivatives referencing derivatives of cryptoasset exposures, institutions require approval from OSFI on the appropriate treatment, which may be higher than the factors listed here.

Return to footnote 9

For example, a tokenised corporate bond will be subject to the same capital requirements as a comparable traditional corporate bond.

Return to footnote 10

Insurers should contact OSFI for the capital treatment of cryptoasset exposures arising in insurance products (e.g., embedded derivative or other exposures).

Return to footnote 11

For this purpose, gross positions are defined as the greater of the absolute value of long and short positions.

Return to footnote 12

Any hedging or diversification benefit should be considered only between instruments referencing the same cryptoasset according to Section 4.4 above.

Return to footnote 13

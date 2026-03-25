# Life Insurance Capital Adequacy Test (2025) – Chapter 11 Aggregation and Diversification of Risks

**Type:** Guideline | **Category:** Capital Adequacy Requirements | **Date:** Issue date November 21, 2024 | **Effective:** 2024-11-21 | **Sector:** Life Insurance and Fraternal Companies | **Status:** FINAL CURRENT | **Tier:** 1

---

- Life Insurance Capital Adequacy Test – Backgrounder (2025)
- Life Insurance Capital Adequacy Test – Letter (2025)
- Life Insurance Capital Adequacy Test – Filing Instructions (2025)

## Note

A Regulatory Notice on Adjustments to the Life Insurance Capital Adequacy Test – Guideline (2025) was published and became effective on May 22, 2025. These adjustments are expected to be incorporated in the next version of the LICAT guideline.

Risk aggregation is the approach used to calculate the total of each and all of the risk elements. A diversification credit or benefit results when the aggregation of risks produces results that are less than the total of the individual risk elements.

## 11.1. Within-risk diversification

Diversification credits are applied to specific components of the mortality and morbidity requirements calculated in Chapter 6. The credit in section 11.1.1 is calculated net of registered reinsurance. Within the calculation of the Base Solvency Buffer used to determine the LICAT ratios, the statistical fluctuation factors in section 11.1.2 are calculated net of registered reinsurance. For the solvency buffers SB 1 , SB 2 and SB 3 defined in section 6.8, statistical fluctuation factors are calculated net of registered reinsurance and additional elements specific to the calculation. Since the requirements for participating business are calculated on a standalone basis (q.v. section 9.1.2), there are no within-risk diversification benefits between similar risks in participating blocks and non-participating blocks.

### 11.1.1. Mortality level and trend risk - diversification credit between life supported and death supported business

A diversification credit is calculated between individually underwritten life supported and individually underwritten death supported business. The diversification credit is determined by first calculating mortality level and trend risk components for individually underwritten life supported business and death supported business in aggregate. The aggregate component for level and trend mortality risk assumes a correlation factor of −75% between life and death supported business and is calculated as:

RC aggregate = RC L 2 + RC D 2 − 1.5 × RC L × RC D

where:

- RC aggregate is the aggregate component for mortality level and trend risk (after diversification) for all life and death supported business;
- RC L is the sum of the individual risk charges for mortality level risk and mortality trend risk for life supported business as determined in sections 6.2.2, 6.2.3, and 7.2.3.1, after applicable transition measures (q.v. section 7.5);
- RC D is the sum of the individual risk charges for mortality level risk and mortality trend risk for death supported business as determined in sections 6.2.2, 6.2.3, and 7.2.3.1, after applicable transition measures (q.v. section 7.5).

The diversification credit is the difference between the sum of the individual mortality level and trend risk components for life supported and death supported business (qq.v. sections 6.2.2, 6.2.3, and 7.2.3.1 after applicable transition measures) and the aggregate component for mortality level and trend risk calculated using the formula above:

Diversification credit = RC L + RC D − RC aggregate

### 11.1.2. Morbidity risk credits

The capital requirements for morbidity risk determined in section 6.4 for certain products are reduced by multiplying the requirement by a statistical fluctuation factor (SFF). For each SFF, exposures are aggregated by product within each geographic region before the SFF is applied. For example, all disability exposures within a geographic region are aggregated (individual active DI, individual active WP, individual disabled DI, group disabled LTD, individual and group disabled WP and group active and disabled STD) before the SFF is applied.

#### 11.1.2.1. Credit for level risk

Morbidity SFFs for level risk are calculated as follows:

##### Disability

SFF ( RC ) = { 1 , if RC ≤ $ 42,000,000 0.9 + 648 RC , if RC > $ 42,000,000

where RC is the capital requirement for level risk.

##### CI

SFF ( FA ) = { 1 , if FA ≤ $ 300,000,000 0.15 + 14,722 FA , if FA > $ 300,000,000

where FA is the total face amount.

##### LTC

SFF ( RC ) = { 1 , if RC ≤ $ 75,000,000 0.5 + 4,330 RC , if RC > $ 75,000,000

where RC is the capital requirement for level risk.

#### 11.1.2.2. Credit for volatility risk

Morbidity SFFs for volatility risk are calculated as follows:

##### Disability

SFF ( RC ) = { 1 , if RC ≤ $ 6,000,000 0.7 + 734 RC , if RC > $ 6,000,000

where RC is the capital requirement for volatility risk.

##### CI

SFF ( FA ) = { 1 , if FA ≤ $ 300,000,000 0.15 + 14,722 FA , if FA > $ 300,000,000

where FA is the total face amount.

##### LTC

SFF ( RC ) = { 1 , if RC ≤ $ 3,000,000 0.3 + 1,212 RC , if RC > $ 3,000,000

where RC is the capital requirement for volatility risk.

##### Travel and credit

SFF ( RC ) = { 1 , if RC ≤ $ 5,000,000 0.2 + 1,788 RC , if RC > $ 5,000,000

where RC is the capital requirement for volatility risk.

##### Medical/Dental (including other A&S)

SFF ( RC ) = { 1 , if RC ≤ $ 3,000,000 0.7 + 519 RC , if RC > $ 3,000,000

where RC is the capital requirement for volatility risk.

### 11.1.3. Mortality and morbidity risks – portfolio volume credit

A credit is given for diversification across geographic regions in the level risk component of the mortality and morbidity requirements. For each of the mortality, morbidity incidence, and morbidity termination requirements for a block of business within a region, the component for level risk may be reduced by:

0.5 × ( L 0 − L 1 )

where L 0 is the level risk component for the block calculated using the volatility and statistical fluctuation factors for its region, and L 1 is the level risk component for the block calculated using volatility and statistical fluctuation factors based on business volumes aggregated across all geographic regions. Both L 0 and L 1 are calculated net of all reinsurance.

## 11.2. Between-risk diversification

After the individual risk components have been calculated, they are aggregated in three stages. First, a post-diversification requirement for insurance risk ( I ) is calculated. Then, an unadjusted diversified requirement for all risks ( D ) is calculated by aggregating the net requirement for insurance risk with the requirements for credit risk and market risk. This unadjusted diversified requirement is compared against the undiversified requirement ( U ) calculated as the sum of individual risk components. The adjusted diversified requirement ( K ) is calculated based on D and U .

If an insurer wishes to take credit for participating or adjustable products (q.v. Chapter 9), or for unregistered reinsurance or reinsurance claims fluctuation reserves (q.v. section 6.8), it will be necessary to calculate the quantities I , D , U and K for one or more subsets of the insurer's book of business.

### 11.2.1. Insurance risk requirement ( I )

The requirement for insurance risk I is calculated by aggregating the components of insurance risk Footnote 1 using a correlation matrix. The formula for I is:

I = ∑ i , j = 1 9 ρ ij × ( IR i − 0.5 × LT i ) × ( IR j − 0.5 × LT j ) + PC

where:

- IR i is the required capital for insurance risk i , before credit for participating and adjustable products,
- LT i is the sum of the level and trend components for insurance risk i ( LT 9 , the level and trend component for expense risk, and LT 7-8 , the lapse sensitive and lapse supported segregated fund guarantee risk components, are zero)
- PC is the requirement for any P&C risks arising from consolidated subsidiaries that write both life and P&C business (q.v. section 6.7)
- ρ ij is the correlation factor between insurance risks i and j , as specified by the following correlation matrix:

**Correlation factor between insurance risks**

| Insurance risk i | Insurance risk j |
| --- | --- |
| Mortality | Longevity |
| Mortality | 1 |
| Longevity | −0.25 |
| Morbidity incidence and claims | 0.5 |
| Morbidity termination | −0.25 |
| Lapse sensitive | 0.25 |
| Lapse supported | 0 |
| Lapse sensitive: seg. fund guarantee | 0.25 |
| Lapse supported seg. fund guarantee | 0 |
| Expense | 0.5 |

However, I may not be lower than the highest value of IR i − 0.5 × LT i + PC for any insurance risk i included in the correlation matrix.

### 11.2.2. Diversified risk requirement ( D )

The unadjusted diversified requirement D for all risks is calculated by aggregating the requirements for credit and market risks with the insurance risk requirement. The correlation assumed between the two classes of risks is 50%. Consequently:

D = A 2 + AI + I 2

where:

- A is the sum of the requirements for credit risk (for both on- and off-balance sheet items) and market risk, and
- I is the insurance risk requirement from the previous section.

### 11.2.3. Undiversified risk requirement ( U )

The undiversified risk requirement U is calculated as:

U = ∑ i = 1 9 IR i + PC + A

where IR i , A and PC are as defined in sections 11.2.1 and 11.2.2.

### 11.2.4. Adjusted diversified requirement ( K )

After the diversified and undiversified risk requirements D and U have been computed, the adjusted diversified requirement K for insurance, credit and market risk is calculated as:

K = 4 5 U + 1 10 LT + max ( 14 U − 7 LT − 62 D 60 + 2 D 2 2 U − LT , 0 )

where:

LT = ∑ i = 1 9 LT i

#### Example: Calculation of the adjusted diversified requirement

Suppose that the life insurance risk requirements for a non-participating block of business in a geographic regions, with corresponding level and trend components, are as follows:

**Life insurance risk requirements**

| Life insurance risk | Gross component ( IR i ) | Level and trend components ( LT i ) |
| --- | --- | --- |
| Mortality | 1,000,000 | 700,000 |
| Longevity | 3,000 | 3,000 |
| Morbidity incidence | 50,000 | 10,000 |
| Morbidity termination | 2,500 | 1,000 |
| Lapse sensitive | 300,000 | 150,000 |
| Lapse supported | 100,000 | 40,000 |
| Lapse sensitive: seg. fund guarantee | 200,000 | 0 |
| Lapse supported: seg. fund guarantee | 400,000 | 0 |
| Expense | 10,000 | 0 |
| Totals | 2,065,500 | 904,000 |

Suppose as well that the block's other risk requirements are as follows:

**Other risk requirements**

| Risk | Component |
| --- | --- |
| Credit risk | 200,000 |
| Market risk | 75,000 |
| Property and casualty risk | 25,000 |

In order to calculate the total requirement K for the block, it is first necessary to calculate the quantities IR i − 0.5 × LT i for each of the life insurance risks:

**Calculation of IR i − 0.5 × LT i by insurance risk**

| Insurance risk | IR i − 0.5 × LT i |
| --- | --- |
| Mortality | 650,000 |
| Longevity | 1,500 |
| Morbidity incidence | 45,000 |
| Morbidity termination | 2,000 |
| Lapse sensitive | 225,000 |
| Lapse supported | 80,000 |
| Lapse sensitive: seg. fund guarantee | 200,000 |
| Lapse supported: seg. fund guarantee | 400,000 |
| Expense | 10,000 |

The insurance risk requirement I is calculated by aggregating the components of the above using the correlation matrix specified in section 11.2.1, and adding the requirement for property and casualty risks:

I = ∑ i , j = 1 9 ρ ij × ( IR i − 0.5 × LT i ) × ( IR j − 0.5 × LT j ) + PC = 930,693 + 25,000 = 955,693

Since the highest value of IR i − 0.5 × LT i + PC is 675,000, the value of I is not increased to account for this minimum.

The requirements for credit and market risk are summed to obtain A :

A = 200,000 + 75,000 = 275,000

after which it is possible to compute the diversified risk requirement D :

D = A 2 + AI + I 2 = 1,118,834

The undiversified risk requirement U is:

U = ∑ i = 1 9 IR i + PC + A = 2,065,500 + 25,000 + 275,000 = 2,365,500

The last quantity needed to calculate K is LT , given by:

LT = ∑ i = 1 9 LT i = 904,000

With D , U and LT known, the final adjusted diversified requirement K is calculated as:

K = 4 5 U + 1 10 LT + max ( 14 U − 7 LT − 62 D 60 + 2 D 2 2 U − LT , 0 ) = 1,982,800

## 11.3. Base Solvency Buffer

The Base Solvency Buffer is equal to:

γ × ( ∑ K non-par + ∑ i ( K par i − CP i ) − ∑ j CA j − CG + SFG SO + OR )

where:

- γ is the scalar defined in section 1.1.5
- ∑ K non-par is the sum of the requirements K calculated for the non-participating block in each geographic region
- The second sum is taken over all qualifying participating blocks, and the third sum is taken over all qualifying adjustable products
- K par i is the standalone adjusted diversified requirement K for qualifying participating block i
- CP i is the par credit for participating block i calculated under section 9.1.2
- CA j is the adjustable credit for adjustable product j calculated under section 9.2.2
- CG is the total of all credits for policyholder deposits and group insurance business under sections 6.8.2 and 6.8.3
- SFG SO is the capital requirement for segregated fund guarantee risk calculated under the Simplified Option (q.v. section 7.5.2)
- OR is the capital requirement for operational risk.

> *Footnotes Footnote 1 Components of insurance risk include the segregated fund guarantee insurance risk components in section 7.2.3. Return to footnote 1 referrer*

## Footnotes

Components of insurance risk include the segregated fund guarantee insurance risk components in section 7.2.3.

Return to footnote 1 referrer

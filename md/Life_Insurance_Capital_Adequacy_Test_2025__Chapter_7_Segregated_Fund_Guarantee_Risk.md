# Life Insurance Capital Adequacy Test (2025) – Chapter 7 Segregated Fund Guarantee Risk

**Type:** Guideline | **Category:** Capital Adequacy Requirements | **Date:** Issue date November 21, 2024 | **Effective:** 2024-11-21 | **Sector:** Life Insurance and Fraternal Companies | **Status:** FINAL CURRENT | **Tier:** 1

---

- Life Insurance Capital Adequacy Test – Backgrounder (2025)
- Life Insurance Capital Adequacy Test – Letter (2025)
- Life Insurance Capital Adequacy Test – Filing Instructions (2025)

## Note

A Regulatory Notice on Adjustments to the Life Insurance Capital Adequacy Test – Guideline (2025) was published and became effective on May 22, 2025. These adjustments are expected to be incorporated in the next version of the LICAT guideline.

This component is for the risk associated with investment or performance-related guarantees on segregated funds or other similar products. The component comprises two parts:

1. An adjustment to retained earnings to account for the Restated Liabilities, as determined under section 7.1, and
2. Capital requirements for credit, market, insurance and operational risks that are included as part of the total requirements for these risks in the calculation of the Base Solvency Buffer. The capital requirements for credit, market and insurance risks are determined by applying various shocks to Restated Liabilities.

## 7.1. Restated Liabilities

Restated Liabilities are determined separately for each legal entity in each geographic region, as defined under section 1.1.5. Restated Liabilities are calculated by modifying the discount rate and expected return assumptions that an insurer uses to calculate Best Estimate Liabilities (i.e. liabilities excluding risk adjustment and CSM), as specified below. Once Restated Liabilities have been determined, the difference between Restated Liabilities and the Best Estimate Liabilities, after any applicable transition measures in section 7.5, is deducted from Adjusted Retained Earnings (q.v. section 2.1.1) or included in Assets Required (q.v. section 12.2.5).

The discount rates for guarantee payouts and the expected return rates for all asset classes under the risk neutral probability measure should be swap rates. These discount rates should not contain any spread above swap rates either on or after the valuation date. In addition, if other components of the model are calibrated using an interest rate assumption, then the interest rates used for calibration should be the same as the swap rates used for discounting, without any spread above these rates either on or after the valuation date.

## 7.2. Capital Requirements

Segregated fund guarantees are subject to capital requirements for credit, market, insurance and operational risks. In all cases where a capital requirement is determined by applying a shock to an assumption used to value liabilities, the requirement is equal to the difference between Restated Liabilities (rather than the liabilities reported in the financial statements) recalculated under the shock, and Restated Liabilities calculated before the shock.

### 7.2.1. Credit risk

The requirement for credit risk is equal to the amount by which Restated Liabilities increases when the starting values of bonds and other fixed-income assets within all segregated funds are reduced by the factor amounts specified for the assets in Chapter 3. The credit risk requirement is calculated net of all reinsurance.

The factor is a weighted average of credit risk factors for the bonds and other fixed-income assets that the fund is permitted to invest in. The weights and factors are calculated assuming that the fund first invests in the asset class attracting the highest capital requirement, to the maximum extent permitted in its prospectus or Annual Information Form (where more current). It is then assumed that the fund continues allocating investments to asset classes in declining order of capital charge, to the maximum extent permitted, until a total allocation of 100% is reached. The factor for the fund is then the sum of the products of the weights and risk factors for the assumed investment allocation.

In the absence of specific limits to asset classes, the starting values of the bonds or other fixed income assets is subject to the highest risk charge applicable to any bond and other fixed-income asset that the fund holds or is permitted to invest in.

If an insurer cannot determine the asset classes in which the fund is permitted to invest in, it should reduce the starting value of the bonds or other fixed income assets by the factor for a BBB-rated bond having a maturity of 10 years.

The total credit risk requirements for segregated fund guarantees calculated in this section is modified by the applicable transition measures found in section 7.5.

### 7.2.2. Market risk

Segregated fund guarantees are subject to requirements for equity risk.

The gross requirement for equity risk is equal to the amount by which Restated Liabilities increase when the value of equities, preferred shares and mutual funds within all segregated funds are shocked downwards and, simultaneously, implied equity volatilities are shocked by specified amounts. The equity risk requirement is calculated net of all reinsurance.

Equity risk hedges may be applied to reduce the requirement as described in section 7.3.

The downward shocks applied to the starting values of equities, preferred shares and mutual funds on the valuation date are the factor amounts for these assets specified in sections 5.2 and 5.4.

Volatility shocks are applied by adding the percentage amounts specified in Appendix 7-A to the annualized current forward equity volatilities used to determine Restated Liabilities. The table in Appendix 7-A shows the annualized current forward equity volatilities in the column down the left and the month at which these shocks apply (i.e., month 1, 2, …, 360, 1200) across the top.

Linear interpolation should be used to derive the additional volatility shocks between the values specified in Appendix 7-A.

Examples: Calculation of Equity Implied Volatility Shocks

The following illustrates the calculation of the equity implied volatility shocks. The shocks are determined according to the table above using linear interpolation where appropriate.

The tables below illustrate shocked volatility using hypothetical annualized current forward equity volatility at each month.

| Annualized Current Forward Volatility (A) | Months | Shock (B) | Shocked Volatility (A+B) |
| --- | --- | --- | --- |
| 5.0 | 1 | +36.0 | 41.0 |
| 5.0 | 115 | (5 × 18.2 + 31 × 30.9) ÷ 36 = +29.1 | 34.1 |
| 5.0 | 550 | +20.0 | 25.0 |

| Annualized Current Forward Volatility (A) | Months | Shock (B) | Shocked Volatility (A+B) |
| --- | --- | --- | --- |
| 18.7 | 1 | 0.3 × 23.0 + 0.7 × 22.0 = +22.3 | 41.0 |
| 18.7 | 115 | (5 × (0.3 × 9.3 + 0.7 × 9.0) + 31 × (0.3 × 18.1 + 0.7 × 17.1)) ÷ 36 = +16.2 | 34.9 |
| 18.7 | 550 | +6.3 | 25.0 |

| Annualized Current Forward Volatility (A) | Months | Shock (B) | Shocked Volatility (A+B) |
| --- | --- | --- | --- |
| 54.0 | 1 | −13.0 | 41.0 |
| 54.0 | 115 | (5 × −4.7 + 31 × −3.4) ÷ 36 = −3.6 | 51.4 |
| 54.0 | 550 | −29.0 | 25.0 |

For companies who prefer to apply the volatility shocks on a spot basis instead of a forward basis, the percentage amounts specified in Appendix 7-B must be added to the annualized current spot equity volatilities used to determine Restated Liabilities. The table in Appendix 7-B shows the annualized current spot equity volatilities in the column down the left and the term at which these shocks apply (i.e., term 1, 2, …, 360, 1200) across the top. As with the forward basis, linear interpolation should be used to derive the additional volatility shocks between the values specified in Appendix 7-B.

The total market risk requirements for segregated fund guarantees calculated in this section is modified by the applicable transition measures found in section 7.5.

### 7.2.3. Insurance risk

Segregated fund guarantees are subject to requirements for mortality risk, longevity risk, lapse risk and expense risk. Restated Liabilities and shocked restated liabilities are projected net of registered reinsurance.

#### 7.2.3.1. Mortality and longevity risk

Segregated fund guarantee mortality and longevity risk requirements are defined in sections 6.2 and 6.3. Mortality risk should be assumed to be a diversifiable risk within all calculations so that, even for a single policy, all mortality assumptions are reflected as proportional decrements and survivorship at each time step. All segregated fund guarantee insurance risk components in this section are calculated as the difference between the present value of shocked cash flows and Restated Liabilities. The amount that should be used for the present value of shocked cash flows is Restated Liabilities with best estimate mortality or longevity assumptions shocked, and with all other assumptions used in the determination of Restated Liabilities unchanged. In particular, the discount rate curve used in the determination of shocked cash flows is the valuation swap curve rather than the rates specified in section 6.1.

Segregated fund guarantees are treated as basic death products. For each set of segregated fund guarantee products, the volatility risk required capital component is given by:

RC = 2.7 × ∑ q ( 1 − q ) ( max ⁡ ( 0 , b − V ) ) 2

where q is the policy's Best Estimate Assumption for mortality, b is the policy guarantee benefit payable immediately in the event of death, V is the Restated Liability for the policy, and the summation is taken over all policies in the set.

The mortality and longevity risk requirements for segregated fund guarantees calculated in this section are modified by the applicable transition measures found in section 7.5.

#### 7.2.3.2. Lapse risk

The requirement for lapse risk for each policy that does not have guaranteed withdrawal benefits, or policy that does but is not in the withdrawal period, is equal to the amount by which Restated Liabilities increases when best estimate lapse rates are shocked up or down by 40% in each valuation set.

If best estimates lapse rates are determined dynamically, the best estimates lapse rates are shocked up or down by 30% in each valuation set. For the purposes of this requirement, dynamic lapse assumptions are those that change automatically with changes in the moneyness of the policy, or because of other factors.

The requirement for lapse risk for each policy with guaranteed withdrawal benefits that is in the withdrawal period is equal to the amount by which Restated Liabilities increases when lapse rates during the withdrawal period are changed as follows:

1. For the first 10 years, lapses are set to the lower of 1% per year, or the best estimate lapse rate used in the determination of Restated Liabilities. However, if the account value falls to zero during the first 10 years, the lapse rate is set to 0% per year in the year this occurs and in all subsequent years.
2. Lapse rates after 10 years are set to 0% per year.

For each policy with guaranteed withdrawal benefits, there is an additional lapse risk requirement to account for the uncertainty in the withdrawal start date and amount. This requirement is equal to the increase in Restated Liabilities when the withdrawal assumption is changed as follows:

1. Withdrawals continue for all policies for which withdrawals have commenced.
2. For Registered Retirement Income Funds for which withdrawals have not commenced, the income start date is set to the valuation date.
3. For all other policies for which withdrawals have not commenced, the income start date is set to the date from the list below that maximizes the increase in the Restated Liability for the policy: The best estimate income start date Three years before the best estimate income start date Three years after the best estimate income start date
4. All withdrawals are for the maximum amount that the policyholder can withdraw without incurring penalties.

1. The best estimate income start date
2. Three years before the best estimate income start date
3. Three years after the best estimate income start date

The lapse risk requirements for segregated fund guarantees calculated in this section are modified by the applicable transition measures found in section 7.5.

#### 7.2.3.3. Expense risk

Segregated fund guarantee expense risk requirements are calculated using section 6.6. The expense risk requirements for segregated fund guarantees calculated in this section are modified by the applicable transition measures found in section 7.5.

### 7.2.4. Operational risk

Segregated fund guarantees are subject to operational risk requirements as specified in section 8.2.

## 7.3. Recognition of Equity Hedges

The requirements in section 7.2.2 may be reduced by equity hedges. Equity hedges that receive recognition under this section cannot be applied towards other equity risks.

To qualify for capital reduction for equity hedges, an insurer's hedging program must be clearly defined and documented. The documentation should be available to OSFI on request and include at a minimum:

- Chief Risk Officer (CRO) or equivalent ongoing and no less frequently than annual review and approval of hedging program;
- Hedging Objectives;
- List and description of the blocks of businesses and types of guarantees that are covered by the hedging strategy, and a list of the financial instruments that can be used to hedge segregated fund guarantees;
- Description and explanation of the risks being hedged and those not being hedged;
- Risk measures and risk limits, which must be approved by the insurer's risk management function;
- Reporting, oversight, and escalation mechanisms (when risk limits are reached);
- Performance measures and monitoring frequency.

Equity hedges of segregated fund guarantees are subject to the requirements for potential replacement cost as described in Chapter 4.

### 7.3.1. Static hedging

The requirements in section 7.2.2 may be reduced by the increase in the insurer's segregated fund guarantee equity hedges resulting from the simultaneous shocks to the starting value of segregated funds and equity implied volatility in section 7.2.2.

If an asset underlying a hedge does not exactly match the assets in the mapped fund corresponding to a guaranteed segregated fund, the price shock applied to the asset underlying the hedge should be reduced using the method specified in section 5.2.4.1 and 5.2.4.2 based on the correlation of weekly returns between the underlying asset and the mapped fund.

### 7.3.2. Dynamic hedging

Instead of applying the downward shock to the starting value of equity hedges in 7.3.1, an insurer with a dynamic hedging program may calculate a separate reduction to the equity risk requirements using a prescribed set of equity price scenarios. The separate reduction is limited to blocks of segregated fund guarantees that are dynamically hedged.

Specific conditions must be met, and confirmation from OSFI is required before an insurer can reduce the requirements in section 7.2.2 for dynamic hedging.

#### 7.3.2.1. Qualitative conditions

In addition to the documents required under 7.3, an insurer's dynamic hedging program must, include the following:

- Description of the risks associated with the dynamic hedging strategy (e.g. liquidity risk, counterparty risk, model risk), as well as a risk management strategy;
- Independent valuation of the hedging asset portfolios;
- A process flow chart that clearly shows the inputs collected and generated, as well as teams involved in the operation of the hedging program (including ALM, valuation and trading functions);
- Description of the roles and responsibility for all personnel and processes involved, including operation, risk management and risk oversight, as well as sign offs from each of the key functions described;
- Roles and responsibilities of the three lines for the dynamic hedging program;
- Description of the process followed to approve the hedging strategy, including the frequency of strategy reviews; and
- Description of the process to review the dynamic hedging program for new products and/or to expand the program.

Insurers should include the items listed above in LICAT Memorandum.

#### 7.3.2.2. Quantitative conditions

An insurer's dynamic hedging program must have been in place for at least three years before it may reduce the requirements in section 7.2.2.

In addition, in the past 12 quarters from the calculation date, for quarters that have changes in liabilities that are greater than 10% of the liabilities for the hedged cash flows as of the previous quarter end, the program's quarterly hedge effectiveness must be within [70%, 130%] in each geographic region where the program is employed. Quarterly hedge effectiveness is defined as:

Quarterly Hedge Effectiveness = Quarterly change in the value of the hedging portfolio Quarterly change in the value of the hedged liabilities

where:

The value of the hedged liabilities is the liability calculated for segregated fund guarantees using only the hedged cash flows (including both hedged outflows and hedged inflows). Changes in the value of the hedged liabilities include all changes due to equity market movements, irrespective of whether the risks are hedged.

#### 7.3.2.3. Dynamic hedging capital credit

The amount by which the equity risk requirements can be reduced to account for the dynamic hedging program is equal to the difference between equity risk requirements reflecting dynamic hedging and the downward price shock component of section 7.2.2, subject to the limitations in 7.3.3.

Equity risk requirements reflecting dynamic hedging are calculated using the prescribed equity price scenarios set out in Appendix 7-C, where each scenario represents a series of 52 weekly (or 12 monthly) equity prices. For each scenario, the difference between changes in the value of Restated Liabilities for the hedged cash flows Footnote 1 and changes in the value of hedging assets (including cash flow incurred) is calculated after each time step and discounted to time zero using the swap curve. Equity risk requirements reflecting dynamic hedging is the average of the positive present values across the prescribed scenarios.

The dynamic hedging program's rebalancing rules and risk tolerance must be appropriately reflected at each time step of the calculation. In addition, the change in the value of hedging assets and the change in the value of Restated Liabilities for the hedged cash flows must only reflect variations in the price of equity, expected claim payments, expected maturities, and the erosion in value due to the passage of time. Values for other variables (e.g. implied volatilities) are the values at time zero and should not change in the projection.

Example: Calculation of Equity Risk Requirements Reflecting Dynamic Hedging

The following illustrates the calculation of the change in value of hedging assets and the change of restated liabilities for the hedged cash flows, from time 0 (opening position) to time 1 (after market movement).

This calculation is repeated at each time step in each of the 20 scenarios. The average of positive present values across the 20 scenarios is then calculated to determine the equity risk requirements reflecting dynamic hedging.

|  | Hedged Liability Value | Hedged Liability Sensitivity | Hedging Asset Value | Hedging Asset Sensitivity |
| --- | --- | --- | --- | --- |
| a) Opening position (valuation date) Table Footnote 1 | 1000 | 100 | 0 | 100 |
| b) Step 1: Update valuation at time 1 | 1200 | n/a | 180 | n/a |
| c) Step 2: Update sensitivity at time 1 | n/a | 110 | n/a | 105 |
| d) Step 3: Perform rebalancing at time 1 | n/a | n/a | 0 | 5 |
| e) Position after rebalancing Table Footnote 2 | 1200 | 110 | 180 | 110 |
| f) Review cash flow incurred Table Footnote 3 | 5 | n/a | −2 | n/a |
| g) Change in this period [e) – a) + f)] | 205 | n/a | 178 | n/a |
| h) Hedging (gains)/losses before discounting = 205 − 178 = 27 i) Hedging (gains)/losses discounted to time 0 = 27 × (1+swap rate) (−1÷52) = ~ 27 Table Footnote 4 Table Footnotes Table Footnote 1 Item a): Valuation of the hedged liabilities are conducted using swap rates excluding illiquidity premiums. Return to table footnote 1 referrer Table Footnote 2 Item e): Position after rebalancing will be the opening position for next period. Return to table footnote 2 referrer Table Footnote 3 Item f): For liability cash flows, positive indicates payout to policyholders. For asset cash flows, positive indicates gain and negative indicates losses. Asset cash flows should include costs of entering into positions, such as transaction costs, and realized gains/losses from exiting positions. Return to table footnote 3 referrer Table Footnote 4 Item i): Hedging (gains)/losses in each period should be discounted to time zero using swap rate curve. Return to table footnote 4 referrer |  |  |  |  |

h) Hedging (gains)/losses before discounting = 205 − 178 = 27

i) Hedging (gains)/losses discounted to time 0 = 27 × (1+swap rate) (−1÷52) = ~ 27 Table Footnote 4

Table Footnotes Table Footnote 1 Item a): Valuation of the hedged liabilities are conducted using swap rates excluding illiquidity premiums. Return to table footnote 1 referrer Table Footnote 2 Item e): Position after rebalancing will be the opening position for next period. Return to table footnote 2 referrer Table Footnote 3 Item f): For liability cash flows, positive indicates payout to policyholders. For asset cash flows, positive indicates gain and negative indicates losses. Asset cash flows should include costs of entering into positions, such as transaction costs, and realized gains/losses from exiting positions. Return to table footnote 3 referrer Table Footnote 4 Item i): Hedging (gains)/losses in each period should be discounted to time zero using swap rate curve. Return to table footnote 4 referrer

Table Footnotes

Item a): Valuation of the hedged liabilities are conducted using swap rates excluding illiquidity premiums.

Return to table footnote 1 referrer

Item e): Position after rebalancing will be the opening position for next period.

Return to table footnote 2 referrer

Item f): For liability cash flows, positive indicates payout to policyholders. For asset cash flows, positive indicates gain and negative indicates losses. Asset cash flows should include costs of entering into positions, such as transaction costs, and realized gains/losses from exiting positions.

Return to table footnote 3 referrer

Item i): Hedging (gains)/losses in each period should be discounted to time zero using swap rate curve.

Return to table footnote 4 referrer

### 7.3.3. Limit on recognition of hedges

Where an insurer is claiming dynamic hedging credit on a block of segregated fund guarantees, the amount by which the total amounts calculated in sections 7.3.1 and 7.3.2 can reduce the requirements in section 7.2.2 is limited to 80% of the requirements in section 7.2.2 for the hedged cash flows only.

## 7.4. Simplified Option

Insurers may calculate segregated fund guarantee risk capital requirements per this section if the conditions in section 7.4.1 are met. The capital requirements calculated in this section are to be used in place of those included in sections 7.2 and 7.3. Total guaranteed value used for simplified option calculations are net of registered reinsurance.

### 7.4.1. Conditions

Insurers with a total guaranteed value of $100M or less may choose to calculate segregated fund guarantee capital requirements using the approach in section 7.4.2 instead of the approach specified in sections 7.2 and 7.3.

An insurer will be required to notify OSFI in writing when first electing to use the Simplified Option. For qualifying insurers, alternating between the methodology described in sections 7.2 and section 7.4 is only permitted every two years. After two years, if the total guaranteed value is greater than $100M, the insurer will be expected to use sections 7.2 and 7.3 to calculate its capital requirements. In addition, an insurer will be required to notify OSFI in writing when changing approaches.

Notwithstanding the conditions above, OSFI has the discretion to require an insurer to use sections 7.2. and 7.3. Factors OSFI may consider in using this discretion include, but are not necessarily limited to, high rate of portfolio growth, changes to the product portfolio, innovative or higher risk products.

### 7.4.2. Capital requirements

Capital requirements are calculated by applying a factor to the total guaranteed value by type of guarantee.

**Factor applied to the guaranteed value, net of registered reinsurance**

| Type of guarantee | Factor |
| --- | --- |
| GMWB | 15% |
| GMMB | 10% |
| GMDB | 10% |

If guarantees cannot be separated (e.g. two guarantees are sold together), the higher factor should be applied to the combined guaranteed value.

Insurers should contact OSFI to determine capital requirements for guarantee types for which factors have not been provided in this section.

## 7.5. Transition Measures

The following transition measures are applicable:

- A scalar of 1.1 should be applied to the items listed in section 7.5.1 and 7.5.2. This scalar will be reassessed by OSFI as policy development occurs over the three-year period following January 1, 2025.
- At the discretion of the insurer and as a one-time election at transition, items listed in section 7.5.1, 7.5.2 and 7.5.3 can be smoothed by averaging them with the previous 3 quarters, no earlier than the first quarter of fiscal year of 2025. This smoothing applies either to all items or to none, and its application will be reassessed after 3 years following January 1, 2025. The election must be made within the first 6 months of the annual accounting period beginning on or after January 1, 2025, and cannot be changed thereafter.

### 7.5.1. Capital requirements

Transition measures apply to the following capital requirements:

- Credit risk (q.v. section 7.2.1)
- Market risk after hedging credits (q.v. section 7.2.2 and 7.3)
- All underlying components of the mortality and longevity risks (q.v. section 7.2.3.1)
- Lapse risk (q.v. section 7.2.3.2)
- Expense risk (q.v. section 7.2.3.3)

The above capital requirements, after applicable transition measures, are included in the calculation of the Base Solvency Buffer (q.v. Chapter 11). Specifically,

- Credit and market risk requirements (after hedging credit), after applicable transition measures, are included in the term A in section 11.2.2.
- Mortality risk components and total mortality risk requirements, after applicable transition measures, are included in the calculation of the within-risk diversification credit in section 11.1 and in the calculation of IR i in section 11.2.1.
- Longevity risk requirements, after applicable transition measures, are included in the calculation of IR i in section 11.2.1.
- Lapse risk requirements, after applicable transition measures, are included in the calculation of IR i in section 11.2.1.
- Expense risk requirements, after applicable transition measures, are included in the calculation of IR i in section 11.2.1.
- The sum of these risk requirements, after application of transition measures, are included in the calculation of the general required capital for operational risk (q.v. Section 8.2.3), which is included in the calculation of OR in section 11.3.

The applicable transition measures also apply when calculating the marginal credit, market and insurance risk requirements for the amounts recoverable on surrender (q.v. section 2.1.2.9)

### 7.5.2. Simplified Option

Transition measures apply to the capital requirements in section 7.4.2. The capital requirements, after applicable transition measures, should be included in component SFG SO in the calculation of the Base Solvency Buffer in section 11.3.

### 7.5.3. Impact of Liability Restatement

The smoothing measure applies to the difference between Restated Liabilities and the Best Estimate Liabilities that is deducted from Adjusted Retained Earnings (q.v. section 2.1.1), or included in Assets Required (q.v. section 12.2.5).

## 7.6. Unregistered Reinsurance

Refer to section 10.2 for the adjustments to Available Capital to account for ceded segregated fund guarantee liabilities arising from unregistered reinsurance.

Eligible Deposits held for unregistered reinsurance per section 10.3, for a period not less than the fund guarantee term remaining, may be recognized subject to the limit in section 6.8.1. For Canadian business, the deposits must be held in Canada, and OSFI must have given the company permission to recognize the deposits.

## Appendix 7-A Equity Implied Volatility Shocks on a Forward Basis

**Equity implied volatility shocks on a forward basis**

| Annualized Current Forward Equity Volatility | 1 month | 6 months | 12 months | 24 months | 36 months | 48 months | 60 months | 84 months | 120 months | 144 months | 180 months | 360 months | 1200 months |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 40.0 | 19.5 | 25.2 | 20.6 | 22.4 | 22.6 | 22.3 | 22.0 | 34.9 | 43.1 | 26.5 | 24.0 | 24.0 |
| 2 | 39.0 | 18.6 | 24.5 | 19.5 | 21.4 | 22.1 | 21.2 | 20.8 | 33.9 | 42.1 | 25.5 | 23.0 | 23.0 |
| 3 | 38.0 | 17.7 | 23.3 | 18.9 | 20.4 | 21.2 | 20.3 | 19.9 | 32.8 | 40.9 | 25.6 | 22.0 | 22.0 |
| 4 | 37.0 | 16.9 | 22.9 | 17.7 | 20.0 | 20.1 | 19.0 | 19.7 | 31.7 | 39.6 | 24.2 | 21.0 | 21.0 |
| 5 | 36.0 | 16.1 | 21.9 | 17.1 | 18.9 | 19.1 | 18.7 | 18.2 | 30.9 | 38.7 | 23.3 | 20.0 | 20.0 |
| 6 | 35.0 | 15.5 | 21.0 | 16.4 | 18.3 | 18.6 | 17.3 | 17.7 | 29.8 | 37.5 | 22.7 | 19.0 | 19.0 |
| 7 | 34.0 | 14.7 | 20.4 | 15.5 | 17.5 | 17.9 | 17.1 | 16.7 | 28.7 | 36.4 | 22.1 | 18.0 | 18.0 |
| 8 | 33.0 | 14.0 | 19.7 | 14.9 | 16.7 | 17.3 | 16.3 | 15.8 | 28.0 | 35.1 | 20.8 | 17.0 | 17.0 |
| 9 | 32.0 | 13.4 | 18.9 | 14.4 | 15.9 | 16.6 | 15.6 | 15.2 | 26.9 | 33.5 | 20.5 | 16.0 | 16.0 |
| 10 | 31.0 | 12.8 | 18.3 | 13.8 | 15.4 | 15.5 | 15.0 | 14.5 | 26.0 | 32.4 | 20.0 | 15.0 | 15.0 |
| 11 | 30.0 | 12.3 | 17.7 | 13.0 | 14.9 | 15.2 | 14.3 | 13.9 | 24.9 | 31.3 | 18.7 | 14.0 | 14.0 |
| 12 | 29.0 | 11.7 | 17.0 | 12.4 | 14.5 | 14.5 | 13.7 | 12.9 | 24.1 | 30.1 | 18.2 | 13.0 | 13.0 |
| 13 | 28.0 | 11.3 | 16.2 | 12.1 | 13.8 | 14.0 | 13.0 | 12.4 | 23.0 | 28.7 | 18.0 | 12.0 | 12.0 |
| 14 | 27.0 | 10.7 | 15.6 | 11.6 | 13.2 | 13.4 | 12.4 | 11.9 | 21.9 | 27.2 | 17.8 | 11.0 | 11.0 |
| 15 | 26.0 | 10.3 | 15.1 | 11.0 | 12.6 | 12.8 | 11.9 | 11.6 | 20.8 | 26.1 | 16.5 | 10.0 | 10.0 |
| 16 | 25.0 | 9.8 | 14.5 | 10.6 | 12.3 | 12.2 | 11.4 | 10.8 | 20.1 | 24.9 | 15.4 | 9.0 | 9.0 |
| 17 | 24.0 | 9.4 | 14.0 | 10.3 | 11.5 | 11.6 | 11.3 | 9.9 | 19.1 | 23.1 | 16.3 | 8.0 | 8.0 |
| 18 | 23.0 | 9.0 | 13.4 | 9.6 | 11.1 | 11.4 | 10.7 | 9.3 | 18.1 | 22.0 | 15.1 | 7.0 | 7.0 |
| 19 | 22.0 | 8.6 | 12.9 | 9.3 | 10.5 | 10.9 | 10.2 | 9.0 | 17.1 | 20.5 | 14.9 | 6.0 | 6.0 |
| 20 | 21.0 | 8.2 | 12.3 | 8.7 | 10.3 | 10.3 | 9.7 | 8.5 | 16.0 | 18.9 | 14.0 | 5.0 | 5.0 |
| 21 | 20.0 | 7.8 | 11.8 | 8.4 | 9.7 | 9.8 | 9.2 | 8.0 | 15.0 | 17.9 | 13.6 | 4.0 | 4.0 |
| 22 | 19.0 | 7.3 | 11.3 | 8.0 | 9.2 | 9.3 | 8.7 | 7.5 | 14.3 | 16.8 | 12.5 | 3.0 | 3.0 |
| 23 | 18.0 | 7.1 | 10.5 | 7.9 | 8.9 | 8.9 | 8.2 | 7.0 | 13.3 | 14.8 | 12.7 | 2.0 | 2.0 |
| 24 | 17.0 | 6.7 | 10.2 | 7.3 | 8.4 | 8.4 | 7.7 | 6.5 | 12.5 | 13.6 | 11.7 | 1.0 | 1.0 |
| 25 | 16.0 | 6.2 | 9.7 | 6.9 | 7.8 | 8.1 | 7.7 | 5.9 | 11.3 | 12.1 | 11.5 | 0.0 | 0.0 |
| 26 | 15.0 | 6.0 | 9.2 | 6.5 | 7.7 | 7.5 | 6.8 | 5.6 | 10.5 | 11.0 | 10.4 | −1.0 | −1.0 |
| 27 | 14.0 | 5.5 | 8.7 | 6.2 | 7.1 | 7.2 | 6.9 | 5.1 | 9.5 | 9.5 | 10.4 | −2.0 | −2.0 |
| 28 | 13.0 | 5.3 | 8.2 | 5.8 | 6.9 | 6.7 | 6.4 | 4.4 | 8.5 | 8.3 | 10.2 | −3.0 | −3.0 |
| 29 | 12.0 | 5.0 | 7.4 | 5.5 | 6.5 | 6.4 | 5.4 | 4.7 | 7.3 | 8.3 | 10.1 | −4.0 | −4.0 |
| 30 | 11.0 | 4.6 | 7.2 | 5.2 | 5.9 | 5.9 | 5.4 | 3.8 | 6.6 | 7.5 | 9.4 | −5.0 | −5.0 |
| 31 | 10.0 | 4.3 | 6.7 | 4.8 | 5.7 | 5.4 | 5.1 | 3.3 | 5.6 | 7.1 | 9.0 | −6.0 | −6.0 |
| 32 | 9.0 | 4.0 | 5.9 | 4.8 | 5.1 | 5.1 | 4.6 | 3.0 | 4.8 | 6.5 | 8.3 | −7.0 | −7.0 |
| 33 | 8.0 | 3.5 | 5.7 | 4.1 | 4.8 | 4.9 | 4.1 | 2.7 | 4.3 | 5.8 | 7.3 | −8.0 | −8.0 |
| 34 | 7.0 | 3.3 | 5.2 | 3.7 | 4.6 | 4.4 | 3.7 | 2.4 | 4.0 | 5.6 | 7.2 | −9.0 | −9.0 |
| 35 | 6.0 | 3.0 | 4.7 | 3.5 | 4.2 | 4.1 | 3.3 | 2.1 | 3.8 | 5.5 | 7.2 | −10.0 | −10.0 |
| 36 | 5.0 | 2.7 | 4.2 | 3.3 | 3.7 | 3.7 | 2.9 | 1.8 | 3.3 | 4.9 | 6.4 | −11.0 | −11.0 |
| 37 | 4.0 | 2.4 | 3.7 | 2.9 | 3.5 | 3.2 | 2.5 | 1.5 | 2.8 | 4.1 | 5.5 | −12.0 | −12.0 |
| 38 | 3.0 | 2.1 | 3.2 | 2.6 | 3.1 | 2.8 | 2.1 | 1.2 | 2.6 | 4.0 | 5.4 | −13.0 | −13.0 |
| 39 | 2.0 | 1.8 | 2.7 | 2.2 | 2.8 | 2.6 | 2.2 | 0.3 | 1.7 | 3.1 | 4.5 | −14.0 | −14.0 |
| 40 | 1.0 | 1.5 | 2.2 | 2.0 | 2.4 | 2.2 | 1.8 | 0.0 | 1.5 | 2.9 | 4.4 | −15.0 | −15.0 |
| 41 | 0.0 | 1.2 | 1.8 | 1.7 | 1.9 | 1.8 | 1.4 | −0.4 | 1.1 | 2.7 | 4.2 | −16.0 | −16.0 |
| 42 | −1.0 | 0.8 | 1.3 | 1.3 | 1.7 | 1.4 | 1.0 | −0.7 | 0.9 | 2.5 | 4.1 | −17.0 | −17.0 |
| 43 | −2.0 | 0.5 | 0.8 | 1.1 | 1.2 | 1.2 | 1.1 | −1.2 | 0.2 | 1.7 | 3.1 | −18.0 | −18.0 |
| 44 | −3.0 | 0.2 | 0.3 | 0.8 | 0.9 | 1.0 | 0.1 | −1.2 | 0.0 | 1.3 | 2.5 | −19.0 | −19.0 |
| 45 | −4.0 | −0.1 | −0.1 | 0.6 | 0.5 | 0.6 | −0.3 | −1.5 | −0.2 | 1.1 | 2.4 | −20.0 | −20.0 |
| 46 | −5.0 | −0.4 | −0.6 | 0.4 | 0.1 | 0.1 | −0.1 | −2.4 | −0.9 | 0.7 | 2.2 | −21.0 | −21.0 |
| 47 | −6.0 | −0.7 | −0.9 | −0.2 | 0.0 | −0.4 | −0.4 | −2.3 | −1.1 | 0.2 | 1.5 | −22.0 | −22.0 |
| 48 | −7.0 | −1.0 | −1.4 | −0.5 | −0.3 | −0.4 | −0.9 | −2.9 | −1.5 | −0.1 | 1.3 | −23.0 | −23.0 |
| 49 | −8.0 | −1.2 | −2.0 | −0.6 | −0.8 | −0.8 | −1.3 | −3.3 | −2.1 | −0.9 | 0.3 | −24.0 | −24.0 |
| 50 | −9.0 | −1.6 | −2.5 | −0.9 | −1.2 | −1.2 | −1.7 | −3.1 | −1.9 | −0.7 | 0.5 | −25.0 | −25.0 |
| 51 | −10.0 | −1.9 | −3.0 | −1.0 | −1.4 | −1.5 | −2.0 | −3.8 | −2.4 | −1.1 | 0.3 | −26.0 | −26.0 |
| 52 | −11.0 | −2.2 | −3.2 | −1.5 | −1.8 | −1.9 | −2.4 | −4.0 | −2.8 | −1.6 | −0.4 | −27.0 | −27.0 |
| 53 | −12.0 | −2.5 | −3.7 | −1.8 | −2.3 | −2.1 | −2.3 | −4.5 | −3.2 | −1.9 | −0.7 | −28.0 | −28.0 |
| 54 | −13.0 | −2.7 | −4.4 | −1.8 | −2.4 | −2.6 | −3.1 | −4.7 | −3.4 | −2.2 | −0.9 | −29.0 | −29.0 |
| 55 | −14.0 | −3.0 | −4.6 | −2.3 | −2.8 | −2.8 | −3.0 | −5.1 | −3.9 | −2.7 | −1.6 | −30.0 | −30.0 |
| 56 | −15.0 | −3.4 | −5.1 | −2.7 | −3.0 | −3.3 | −3.4 | −5.5 | −4.3 | −3.0 | −1.8 | −31.0 | −31.0 |
| 57 | −16.0 | −3.7 | −5.6 | −2.8 | −3.2 | −3.7 | −3.7 | −5.7 | −4.6 | −3.5 | −2.5 | −32.0 | −32.0 |
| 58 | −17.0 | −3.9 | −6.0 | −3.2 | −3.6 | −3.8 | −3.6 | −6.5 | −5.3 | −4.0 | −2.7 | −33.0 | −33.0 |
| 59 | −18.0 | −4.2 | −6.5 | −3.5 | −3.9 | −4.0 | −4.5 | −6.2 | −5.0 | −3.9 | −2.7 | −34.0 | −34.0 |
| 60 | −18.9 | −4.6 | −7.0 | −3.6 | −4.2 | −4.6 | −4.3 | −7.0 | −5.8 | −4.6 | −3.5 | −35.0 | −35.0 |
| 61 | −19.9 | −4.8 | −7.4 | −4.0 | −4.4 | −4.8 | −5.2 | −6.8 | −6.0 | −5.2 | −4.5 | −36.0 | −36.0 |
| 62 | −20.9 | −5.1 | −7.9 | −4.3 | −4.9 | −5.0 | −5.2 | −7.5 | −6.5 | −5.4 | −4.4 | −37.0 | −37.0 |
| 63 | −21.9 | −5.5 | −8.3 | −4.4 | −5.1 | −5.3 | −5.4 | −7.9 | −6.8 | −5.7 | −4.7 | −38.0 | −38.0 |
| 64 | −22.9 | −5.7 | −8.8 | −4.7 | −5.8 | −5.6 | −5.9 | −8.0 | −6.9 | −5.8 | −4.6 | −39.0 | −39.0 |
| 65 | −23.9 | −6.0 | −9.2 | −4.8 | −5.9 | −6.0 | −6.2 | −8.3 | −7.3 | −6.3 | −5.3 | −40.0 | −40.0 |
| 66 | −24.9 | −6.3 | −9.5 | −5.3 | −6.3 | −6.4 | −6.6 | −8.7 | −7.9 | −7.1 | −6.4 | −41.0 | −41.0 |
| 67 | −25.9 | −6.6 | −10.1 | −5.5 | −6.6 | −6.4 | −7.0 | −8.8 | −8.0 | −7.2 | −6.4 | −42.0 | −42.0 |
| 68 | −26.9 | −6.9 | −10.6 | −5.6 | −7.0 | −6.9 | −6.7 | −9.4 | −8.5 | −7.6 | −6.6 | −43.0 | −43.0 |
| 69 | −27.9 | −7.2 | −10.9 | −6.1 | −7.2 | −7.1 | −7.7 | −9.4 | −8.5 | −7.5 | −6.6 | −44.0 | −44.0 |
| 70 | −28.9 | −7.4 | −11.6 | −6.2 | −7.6 | −7.6 | −7.4 | −9.9 | −9.1 | −8.2 | −7.4 | −45.0 | −45.0 |
| 71 | −29.9 | −7.8 | −11.8 | −6.7 | −7.8 | −7.7 | −7.9 | −10.5 | −9.5 | −8.6 | −7.6 | −46.0 | −46.0 |
| 72 | −30.9 | −8.0 | −12.5 | −6.7 | −8.2 | −8.2 | −7.7 | −11.1 | −10.1 | −9.0 | −7.9 | −47.0 | −47.0 |
| 73 | −31.9 | −8.3 | −12.7 | −7.2 | −8.3 | −8.4 | −8.5 | −10.8 | −10.1 | −9.4 | −8.8 | −48.0 | −48.0 |
| 74 | −32.9 | −8.5 | −13.4 | −7.2 | −8.7 | −8.9 | −8.4 | −11.6 | −10.6 | −9.7 | −8.7 | −49.0 | −49.0 |
| 75 | −33.9 | −8.9 | −13.9 | −7.5 | −9.0 | −8.9 | −8.8 | −11.7 | −10.7 | −9.7 | −8.7 | −50.0 | −50.0 |

## Appendix 7-B Equity Implied Volatility Shocks on a Spot Basis

**Equity implied volatility shocks on a spot basis**

| Annualized Current Spot Equity Volatility | 1 month | 6 months | 12 months | 24 months | 36 months | 48 months | 60 months | 84 months | 120 months | 144 months | 180 months | 360 months | 1200 months |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 40.0 | 29.3 | 26.3 | 24.4 | 23.5 | 23.3 | 23.1 | 23.0 | 23.7 | 27.6 | 28.9 | 27.1 | 25.0 |
| 2 | 39.0 | 28.3 | 25.4 | 23.5 | 22.5 | 22.4 | 22.2 | 22.0 | 22.7 | 26.6 | 27.9 | 26.1 | 24.0 |
| 3 | 38.0 | 27.4 | 24.4 | 22.6 | 21.6 | 21.5 | 21.3 | 21.1 | 21.8 | 25.6 | 27.0 | 25.4 | 23.1 |
| 4 | 37.0 | 26.4 | 23.6 | 21.7 | 20.8 | 20.7 | 20.4 | 20.3 | 21.0 | 24.7 | 26.0 | 24.3 | 22.0 |
| 5 | 36.0 | 25.5 | 22.7 | 20.9 | 20.0 | 19.8 | 19.6 | 19.4 | 20.1 | 23.8 | 25.1 | 23.4 | 21.1 |
| 6 | 35.0 | 24.7 | 21.9 | 20.1 | 19.2 | 19.1 | 18.8 | 18.6 | 19.3 | 22.9 | 24.2 | 22.6 | 20.1 |
| 7 | 34.0 | 23.8 | 21.1 | 19.3 | 18.4 | 18.3 | 18.1 | 17.9 | 18.5 | 22.0 | 23.3 | 21.7 | 19.2 |
| 8 | 33.0 | 22.9 | 20.3 | 18.6 | 17.7 | 17.6 | 17.4 | 17.1 | 17.8 | 21.2 | 22.4 | 20.7 | 18.2 |
| 9 | 32.0 | 22.1 | 19.5 | 17.9 | 17.0 | 16.9 | 16.7 | 16.4 | 17.1 | 20.3 | 21.5 | 19.9 | 17.2 |
| 10 | 31.0 | 21.3 | 18.8 | 17.2 | 16.4 | 16.2 | 16.0 | 15.7 | 16.4 | 19.5 | 20.7 | 19.2 | 16.3 |
| 11 | 30.0 | 20.5 | 18.1 | 16.5 | 15.7 | 15.6 | 15.4 | 15.1 | 15.7 | 18.7 | 19.8 | 18.1 | 15.3 |
| 12 | 29.0 | 19.7 | 17.4 | 15.8 | 15.1 | 15.0 | 14.8 | 14.4 | 15.0 | 17.9 | 19.0 | 17.4 | 14.4 |
| 13 | 28.0 | 19.0 | 16.7 | 15.2 | 14.5 | 14.4 | 14.2 | 13.8 | 14.4 | 17.1 | 18.2 | 16.7 | 13.5 |
| 14 | 27.0 | 18.2 | 16.0 | 14.6 | 13.9 | 13.8 | 13.6 | 13.2 | 13.8 | 16.3 | 17.4 | 16.0 | 12.6 |
| 15 | 26.0 | 17.5 | 15.4 | 14.0 | 13.3 | 13.2 | 13.0 | 12.7 | 13.2 | 15.6 | 16.6 | 15.0 | 11.6 |
| 16 | 25.0 | 16.7 | 14.7 | 13.4 | 12.8 | 12.7 | 12.5 | 12.1 | 12.6 | 14.9 | 15.8 | 14.1 | 10.6 |
| 17 | 24.0 | 16.0 | 14.1 | 12.9 | 12.3 | 12.1 | 12.0 | 11.5 | 12.1 | 14.1 | 15.1 | 13.7 | 9.8 |
| 18 | 23.0 | 15.3 | 13.5 | 12.3 | 11.7 | 11.6 | 11.5 | 11.0 | 11.5 | 13.4 | 14.3 | 12.7 | 8.9 |
| 19 | 22.0 | 14.6 | 12.9 | 11.8 | 11.2 | 11.1 | 11.0 | 10.5 | 11.0 | 12.7 | 13.6 | 12.1 | 8.0 |
| 20 | 21.0 | 13.9 | 12.3 | 11.2 | 10.7 | 10.6 | 10.5 | 10.0 | 10.5 | 12.0 | 12.8 | 11.2 | 7.0 |
| 21 | 20.0 | 13.2 | 11.7 | 10.7 | 10.2 | 10.1 | 10.0 | 9.5 | 9.9 | 11.3 | 12.1 | 10.5 | 6.1 |
| 22 | 19.0 | 12.5 | 11.1 | 10.2 | 9.7 | 9.6 | 9.5 | 9.0 | 9.4 | 10.7 | 11.4 | 9.7 | 5.2 |
| 23 | 18.0 | 11.9 | 10.5 | 9.7 | 9.3 | 9.2 | 9.1 | 8.5 | 9.0 | 10.0 | 10.7 | 9.1 | 4.3 |
| 24 | 17.0 | 11.2 | 10.0 | 9.2 | 8.8 | 8.7 | 8.6 | 8.0 | 8.5 | 9.4 | 10.0 | 8.3 | 3.4 |
| 25 | 16.0 | 10.5 | 9.4 | 8.7 | 8.3 | 8.2 | 8.2 | 7.6 | 8.0 | 8.7 | 9.3 | 7.6 | 2.5 |
| 26 | 15.0 | 9.9 | 8.9 | 8.2 | 7.9 | 7.8 | 7.7 | 7.1 | 7.5 | 8.1 | 8.6 | 6.8 | 1.6 |
| 27 | 14.0 | 9.2 | 8.3 | 7.7 | 7.4 | 7.3 | 7.3 | 6.7 | 7.1 | 7.5 | 8.0 | 6.2 | 0.7 |
| 28 | 13.0 | 8.6 | 7.8 | 7.2 | 7.0 | 6.9 | 6.9 | 6.2 | 6.6 | 6.8 | 7.3 | 5.6 | −0.1 |
| 29 | 12.0 | 8.0 | 7.2 | 6.7 | 6.5 | 6.5 | 6.4 | 5.8 | 6.2 | 6.2 | 6.7 | 5.0 | −1.0 |
| 30 | 11.0 | 7.3 | 6.7 | 6.3 | 6.1 | 6.0 | 6.0 | 5.3 | 5.8 | 5.6 | 6.0 | 4.3 | −1.9 |
| 31 | 10.0 | 6.7 | 6.2 | 5.8 | 5.7 | 5.6 | 5.6 | 4.9 | 5.3 | 5.0 | 5.4 | 3.6 | −2.8 |
| 32 | 9.0 | 6.1 | 5.6 | 5.4 | 5.3 | 5.2 | 5.2 | 4.5 | 4.9 | 4.4 | 4.7 | 2.8 | −3.7 |
| 33 | 8.0 | 5.4 | 5.1 | 4.9 | 4.8 | 4.8 | 4.8 | 4.1 | 4.5 | 3.9 | 4.1 | 2.1 | −4.6 |
| 34 | 7.0 | 4.8 | 4.6 | 4.4 | 4.4 | 4.4 | 4.4 | 3.7 | 4.1 | 3.3 | 3.5 | 1.5 | −5.4 |
| 35 | 6.0 | 4.2 | 4.1 | 4.0 | 4.0 | 4.0 | 4.0 | 3.3 | 3.7 | 2.7 | 2.9 | 1.0 | −6.3 |
| 36 | 5.0 | 3.6 | 3.6 | 3.6 | 3.6 | 3.6 | 3.6 | 2.9 | 3.3 | 2.1 | 2.2 | 0.2 | −7.2 |
| 37 | 4.0 | 3.0 | 3.1 | 3.1 | 3.2 | 3.2 | 3.2 | 2.5 | 2.9 | 1.6 | 1.6 | −0.6 | −8.1 |
| 38 | 3.0 | 2.4 | 2.6 | 2.7 | 2.8 | 2.8 | 2.8 | 2.1 | 2.5 | 1.0 | 1.0 | −1.2 | −8.9 |
| 39 | 2.0 | 1.8 | 2.1 | 2.2 | 2.4 | 2.4 | 2.5 | 1.7 | 2.1 | 0.5 | 0.4 | −1.9 | −9.8 |
| 40 | 1.0 | 1.2 | 1.6 | 1.8 | 2.0 | 2.0 | 2.1 | 1.3 | 1.7 | −0.1 | −0.2 | −2.5 | −10.7 |
| 41 | 0.0 | 0.6 | 1.1 | 1.4 | 1.6 | 1.6 | 1.7 | 0.9 | 1.3 | −0.6 | −0.7 | −3.0 | −11.5 |
| 42 | −1.0 | 0.0 | 0.6 | 0.9 | 1.2 | 1.2 | 1.3 | 0.5 | 0.9 | −1.2 | −1.3 | −3.6 | −12.3 |
| 43 | −2.0 | −0.6 | 0.1 | 0.5 | 0.8 | 0.8 | 1.0 | 0.2 | 0.5 | −1.7 | −1.9 | −4.4 | −13.2 |
| 44 | −3.0 | −1.2 | −0.4 | 0.1 | 0.4 | 0.5 | 0.6 | −0.2 | 0.2 | −2.2 | −2.5 | −5.1 | −14.1 |
| 45 | −4.0 | −1.8 | −0.9 | −0.3 | 0.0 | 0.1 | 0.2 | −0.6 | −0.2 | −2.8 | −3.1 | −5.6 | −15.0 |
| 46 | −5.0 | −2.4 | −1.4 | −0.7 | −0.3 | −0.3 | −0.1 | −1.0 | −0.6 | −3.3 | −3.6 | −6.1 | −15.8 |
| 47 | −6.0 | −3.0 | −1.8 | −1.2 | −0.7 | −0.7 | −0.5 | −1.3 | −0.9 | −3.8 | −4.2 | −6.9 | −16.7 |
| 48 | −7.0 | −3.6 | −2.3 | −1.6 | −1.1 | −1.0 | −0.8 | −1.7 | −1.3 | −4.3 | −4.7 | −7.4 | −17.5 |
| 49 | −8.0 | −4.1 | −2.8 | −2.0 | −1.5 | −1.4 | −1.2 | −2.1 | −1.7 | −4.8 | −5.3 | −8.2 | −18.4 |
| 50 | −9.0 | −4.7 | −3.3 | −2.4 | −1.9 | −1.8 | −1.6 | −2.4 | −2.0 | −5.4 | −5.9 | −8.7 | −19.2 |
| 51 | −10.0 | −5.3 | −3.8 | −2.8 | −2.2 | −2.1 | −1.9 | −2.8 | −2.4 | −5.9 | −6.4 | −9.2 | −20.0 |
| 52 | −11.0 | −5.9 | −4.2 | −3.2 | −2.6 | −2.5 | −2.3 | −3.2 | −2.7 | −6.4 | −7.0 | −9.9 | −20.9 |
| 53 | −12.0 | −6.5 | −4.7 | −3.6 | −3.0 | −2.9 | −2.6 | −3.5 | −3.1 | −6.9 | −7.5 | −10.4 | −21.7 |
| 54 | −13.0 | −7.0 | −5.2 | −4.0 | −3.3 | −3.2 | −3.0 | −3.9 | −3.5 | −7.4 | −8.0 | −11.0 | −22.5 |
| 55 | −14.0 | −7.6 | −5.6 | −4.4 | −3.7 | −3.6 | −3.3 | −4.2 | −3.8 | −7.9 | −8.6 | −11.7 | −23.4 |
| 56 | −15.0 | −8.2 | −6.1 | −4.9 | −4.1 | −4.0 | −3.7 | −4.6 | −4.2 | −8.4 | −9.1 | −12.2 | −24.2 |
| 57 | −16.0 | −8.8 | −6.6 | −5.3 | −4.4 | −4.3 | −4.0 | −4.9 | −4.5 | −8.9 | −9.7 | −12.9 | −25.1 |
| 58 | −17.0 | −9.3 | −7.0 | −5.7 | −4.8 | −4.7 | −4.3 | −5.3 | −4.9 | −9.4 | −10.2 | −13.5 | −25.9 |
| 59 | −18.0 | −9.9 | −7.5 | −6.1 | −5.2 | −5.0 | −4.7 | −5.6 | −5.2 | −9.9 | −10.7 | −14.0 | −26.7 |
| 60 | −18.9 | −10.5 | −8.0 | −6.5 | −5.5 | −5.4 | −5.0 | −6.0 | −5.5 | −10.3 | −11.2 | −14.6 | −27.5 |
| 61 | −19.9 | −11.0 | −8.4 | −6.9 | −5.9 | −5.7 | −5.4 | −6.3 | −5.9 | −10.8 | −11.8 | −15.4 | −28.4 |
| 62 | −20.9 | −11.6 | −8.9 | −7.3 | −6.3 | −6.1 | −5.7 | −6.7 | −6.2 | −11.3 | −12.3 | −15.9 | −29.2 |
| 63 | −21.9 | −12.2 | −9.4 | −7.7 | −6.6 | −6.4 | −6.0 | −7.0 | −6.6 | −11.8 | −12.8 | −16.4 | −30.0 |
| 64 | −22.9 | −12.7 | −9.8 | −8.0 | −7.0 | −6.8 | −6.4 | −7.4 | −6.9 | −12.3 | −13.3 | −16.9 | −30.8 |
| 65 | −23.9 | −13.3 | −10.3 | −8.4 | −7.3 | −7.1 | −6.7 | −7.7 | −7.2 | −12.8 | −13.9 | −17.6 | −31.7 |
| 66 | −24.9 | −13.9 | −10.7 | −8.8 | −7.7 | −7.5 | −7.1 | −8.1 | −7.6 | −13.2 | −14.4 | −18.3 | −32.5 |
| 67 | −25.9 | −14.4 | −11.2 | −9.2 | −8.1 | −7.8 | −7.4 | −8.4 | −7.9 | −13.7 | −14.9 | −18.8 | −33.3 |
| 68 | −26.9 | −15.0 | −11.7 | −9.6 | −8.4 | −8.2 | −7.7 | −8.7 | −8.3 | −14.2 | −15.4 | −19.4 | −34.1 |
| 69 | −27.9 | −15.6 | −12.1 | −10.0 | −8.8 | −8.5 | −8.1 | −9.1 | −8.6 | −14.7 | −15.9 | −19.8 | −34.9 |
| 70 | −28.9 | −16.1 | −12.6 | −10.4 | −9.1 | −8.9 | −8.4 | −9.4 | −8.9 | −15.1 | −16.4 | −20.5 | −35.8 |
| 71 | −29.9 | −16.7 | −13.0 | −10.8 | −9.5 | −9.2 | −8.7 | −9.8 | −9.3 | −15.6 | −16.9 | −21.0 | −36.6 |
| 72 | −30.9 | −17.2 | −13.5 | −11.2 | −9.8 | −9.6 | −9.0 | −10.1 | −9.7 | −16.1 | −17.4 | −21.6 | −37.4 |
| 73 | −31.9 | −17.8 | −13.9 | −11.6 | −10.2 | −9.9 | −9.4 | −10.4 | −10.0 | −16.5 | −17.9 | −22.3 | −38.2 |
| 74 | −32.9 | −18.3 | −14.4 | −12.0 | −10.5 | −10.3 | −9.7 | −10.8 | −10.3 | −17.0 | −18.4 | −22.7 | −39.0 |
| 75 | −33.9 | −18.9 | −14.9 | −12.4 | −10.9 | −10.6 | −10.0 | −11.1 | −10.6 | −17.5 | −18.9 | −23.2 | −39.8 |

## Appendix 7-C Equity Price Scenarios

The following 20 scenarios are equity scenarios with starting value of 100, with weekly steps over one year horizon.

**Weekly equity price over one year horizon - Scenarios 1 to 10**

| Week | Scenario 1 | Scenario 2 | Scenario 3 | Scenario 4 | Scenario 5 | Scenario 6 | Scenario 7 | Scenario 8 | Scenario 9 | Scenario 10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 |
| 1 | 98.7970 | 96.8683 | 99.3986 | 98.1888 | 100.9941 | 99.9861 | 101.1119 | 99.1786 | 101.6006 | 101.6903 |
| 2 | 97.3052 | 96.5186 | 92.8778 | 96.7853 | 98.4617 | 100.7745 | 98.2086 | 95.2892 | 97.7093 | 105.8101 |
| 3 | 97.1394 | 97.4251 | 93.9120 | 83.8656 | 97.5216 | 96.6010 | 97.8687 | 91.4380 | 97.5545 | 104.4836 |
| 4 | 94.4242 | 98.2079 | 93.3285 | 83.3706 | 97.9573 | 95.3301 | 99.2204 | 92.9601 | 96.9777 | 106.8300 |
| 5 | 95.2207 | 98.2644 | 93.2644 | 82.0308 | 97.3128 | 92.7091 | 98.0153 | 94.7481 | 96.6300 | 107.7423 |
| 6 | 96.3871 | 99.0042 | 93.4422 | 80.5850 | 97.3352 | 93.6007 | 98.8759 | 90.9911 | 96.4362 | 107.8391 |
| 7 | 94.4367 | 99.8657 | 92.5945 | 82.1358 | 100.5347 | 90.9215 | 99.7119 | 92.2636 | 96.9410 | 108.1354 |
| 8 | 93.6641 | 99.7570 | 96.1225 | 83.9099 | 96.2567 | 88.3318 | 98.5094 | 89.5542 | 94.8005 | 106.6145 |
| 9 | 94.2661 | 97.6913 | 97.5722 | 83.0715 | 94.8379 | 88.1819 | 101.6938 | 93.3412 | 97.0180 | 105.0775 |
| 10 | 94.6542 | 95.3841 | 96.2288 | 83.0872 | 94.1812 | 85.8473 | 98.1329 | 90.1725 | 96.7847 | 105.0137 |
| 11 | 92.3250 | 90.7800 | 95.0170 | 85.1775 | 93.7344 | 86.0981 | 98.4102 | 91.5068 | 93.8839 | 102.6084 |
| 12 | 93.3846 | 92.0924 | 93.1338 | 84.3054 | 94.4081 | 83.3136 | 97.7366 | 88.9052 | 91.8163 | 103.5422 |
| 13 | 87.8595 | 91.0979 | 92.8686 | 85.2758 | 94.7769 | 84.8910 | 100.5344 | 85.3718 | 90.5434 | 104.7303 |
| 14 | 84.1003 | 89.3071 | 92.6620 | 84.9788 | 98.1881 | 84.5886 | 101.3079 | 84.9085 | 89.2155 | 102.3614 |
| 15 | 84.9736 | 84.2546 | 94.3404 | 87.1509 | 100.5429 | 84.6679 | 100.6505 | 83.5131 | 87.8703 | 100.9246 |
| 16 | 83.0929 | 85.2126 | 94.0242 | 90.4514 | 101.0311 | 84.7077 | 98.7565 | 79.9113 | 88.7022 | 100.5428 |
| 17 | 81.7866 | 83.4540 | 95.9440 | 91.2319 | 101.4038 | 82.8723 | 98.3360 | 79.5966 | 93.1033 | 99.3282 |
| 18 | 81.9300 | 80.1818 | 95.2847 | 89.9735 | 101.9361 | 84.2472 | 98.7323 | 78.1680 | 91.0126 | 101.8168 |
| 19 | 84.1286 | 71.1607 | 90.3047 | 87.8903 | 103.0117 | 83.0786 | 98.2534 | 79.4997 | 90.0720 | 99.7325 |
| 20 | 83.1505 | 71.3327 | 92.5724 | 86.2805 | 101.2824 | 83.1230 | 93.7856 | 77.2098 | 92.0672 | 101.8461 |
| 21 | 83.5336 | 68.9453 | 88.2018 | 86.0172 | 101.3358 | 80.5688 | 95.6593 | 75.7004 | 90.3513 | 100.9568 |
| 22 | 80.3745 | 73.8789 | 86.8768 | 83.6347 | 101.2116 | 79.0808 | 92.7257 | 78.5419 | 89.9788 | 102.4787 |
| 23 | 84.2986 | 76.0352 | 85.9882 | 85.1649 | 98.3420 | 76.7123 | 95.6206 | 76.8864 | 90.2703 | 100.2106 |
| 24 | 82.5651 | 76.4562 | 84.7751 | 82.8855 | 99.0425 | 76.0666 | 93.1995 | 77.7610 | 93.5943 | 95.1277 |
| 25 | 82.0242 | 75.2415 | 84.6915 | 81.5497 | 99.6889 | 77.5243 | 91.1624 | 79.5425 | 91.8534 | 90.5325 |
| 26 | 79.0982 | 74.0352 | 84.2703 | 81.1228 | 101.5207 | 76.3769 | 91.5660 | 79.9211 | 90.3565 | 87.5902 |
| 27 | 78.0058 | 72.6670 | 88.4579 | 78.3252 | 100.2622 | 75.4253 | 87.6861 | 76.9846 | 87.9394 | 83.1495 |
| 28 | 75.7063 | 69.4887 | 85.8238 | 75.2961 | 98.6811 | 74.8627 | 89.2977 | 78.7657 | 86.5958 | 82.3845 |
| 29 | 72.6348 | 71.6235 | 84.6976 | 74.8067 | 96.6382 | 73.7156 | 92.3732 | 77.5871 | 84.9955 | 83.2128 |
| 30 | 74.5695 | 67.9354 | 79.4751 | 73.8603 | 99.6738 | 70.6003 | 89.9241 | 77.6140 | 87.8894 | 81.2557 |
| 31 | 72.3446 | 66.3290 | 76.1851 | 73.1402 | 99.7083 | 67.1256 | 87.9161 | 77.8994 | 70.8098 | 79.1764 |
| 32 | 66.0096 | 64.8758 | 76.8703 | 71.9930 | 97.3729 | 68.6955 | 85.1563 | 79.8995 | 67.8826 | 73.5773 |
| 33 | 68.6769 | 63.5391 | 79.2757 | 69.5167 | 81.2608 | 64.5944 | 83.5625 | 84.7773 | 68.0490 | 73.1151 |
| 34 | 68.0810 | 64.2522 | 78.5518 | 66.9905 | 76.4614 | 66.8182 | 80.4579 | 88.2504 | 68.7796 | 71.7078 |
| 35 | 69.3944 | 60.3566 | 73.8380 | 68.6280 | 72.6028 | 67.4251 | 80.4076 | 90.3618 | 69.0107 | 73.1234 |
| 36 | 67.3572 | 59.4799 | 76.9216 | 71.8486 | 73.7626 | 69.0519 | 80.2839 | 85.6648 | 69.3703 | 72.0355 |
| 37 | 64.0510 | 60.0263 | 75.3546 | 72.4319 | 74.1592 | 67.6117 | 79.4525 | 83.7070 | 68.5771 | 72.5236 |
| 38 | 61.7929 | 59.0163 | 76.6730 | 77.0349 | 73.5703 | 70.3256 | 80.4392 | 81.7698 | 69.7732 | 72.7998 |
| 39 | 60.7075 | 62.7510 | 70.4044 | 78.0264 | 71.5350 | 69.0774 | 78.7299 | 79.8591 | 71.5697 | 71.9689 |
| 40 | 61.6795 | 63.2192 | 69.1831 | 65.1049 | 69.5187 | 70.0646 | 75.4120 | 80.6697 | 67.2250 | 71.5301 |
| 41 | 63.3452 | 61.7718 | 71.6714 | 63.5372 | 72.3599 | 67.4499 | 75.6395 | 77.3654 | 69.6734 | 71.1541 |
| 42 | 62.2393 | 60.5148 | 70.0022 | 62.5647 | 70.7673 | 67.4582 | 72.9706 | 77.2469 | 69.1896 | 70.0658 |
| 43 | 58.6278 | 59.6287 | 68.6723 | 61.4283 | 67.5830 | 65.7134 | 73.9720 | 80.6451 | 69.3147 | 68.4741 |
| 44 | 57.5402 | 58.6160 | 64.5141 | 62.9287 | 68.7768 | 66.9007 | 72.0298 | 83.3764 | 70.2676 | 69.2260 |
| 45 | 57.1015 | 57.7187 | 67.0058 | 60.0613 | 69.9415 | 69.3632 | 67.4212 | 86.9800 | 70.4284 | 67.1138 |
| 46 | 54.5786 | 59.1123 | 65.5425 | 58.5752 | 71.7350 | 70.9283 | 68.7218 | 80.6092 | 72.6067 | 68.8950 |
| 47 | 53.5556 | 57.8515 | 62.3272 | 59.7072 | 67.8353 | 71.8586 | 64.9337 | 79.0385 | 74.5590 | 69.7921 |
| 48 | 51.5959 | 58.7823 | 61.8313 | 59.7655 | 68.6950 | 69.8328 | 61.9028 | 74.5982 | 76.2556 | 67.8927 |
| 49 | 49.2207 | 56.8663 | 62.0335 | 59.7395 | 66.9320 | 72.4179 | 59.3747 | 68.9382 | 66.8253 | 64.7807 |
| 50 | 50.7417 | 54.0780 | 55.7309 | 62.3448 | 66.4736 | 70.3473 | 60.3621 | 65.8870 | 66.6616 | 63.3644 |
| 51 | 49.6020 | 51.0973 | 56.8299 | 62.0824 | 65.5805 | 65.9308 | 61.0291 | 65.3869 | 64.2563 | 65.6700 |
| 52 | 49.7922 | 54.9144 | 57.5049 | 62.8909 | 64.0464 | 64.3109 | 64.4464 | 64.5551 | 64.9331 | 64.9677 |

**Weekly equity price over one year horizon - Scenarios 11 to 20**

| Week | Scenario 11 | Scenario 12 | Scenario 13 | Scenario 14 | Scenario 15 | Scenario 16 | Scenario 17 | Scenario 18 | Scenario 19 | Scenario 20 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 |
| 1 | 99.8193 | 98.8483 | 99.5169 | 100.9373 | 94.3804 | 100.8456 | 100.3089 | 99.5799 | 102.4532 | 99.7172 |
| 2 | 103.1410 | 96.1216 | 98.5032 | 101.8912 | 91.8959 | 99.9980 | 101.2950 | 104.4412 | 106.3560 | 100.6899 |
| 3 | 101.9193 | 97.3152 | 98.3516 | 100.4256 | 92.6468 | 99.5759 | 101.1228 | 104.0596 | 105.3275 | 101.5106 |
| 4 | 102.9123 | 98.1760 | 99.3762 | 99.4196 | 96.2791 | 99.8008 | 101.1711 | 102.9396 | 103.3518 | 100.4775 |
| 5 | 103.3265 | 99.3251 | 96.7524 | 93.4987 | 98.1296 | 100.4458 | 102.0132 | 103.3459 | 101.9924 | 104.5266 |
| 6 | 104.5843 | 101.9380 | 100.7400 | 95.2509 | 95.1175 | 102.2959 | 106.1939 | 102.9457 | 101.6663 | 100.8956 |
| 7 | 100.6492 | 102.1271 | 104.2376 | 94.1282 | 98.4196 | 102.5104 | 108.5723 | 101.6172 | 103.8093 | 100.0915 |
| 8 | 103.0136 | 99.3691 | 106.4431 | 93.7279 | 100.6460 | 102.2253 | 111.5289 | 103.5657 | 105.7656 | 102.1681 |
| 9 | 103.4409 | 99.2216 | 107.8320 | 92.8193 | 100.7243 | 101.9858 | 115.2949 | 106.7555 | 110.5291 | 103.3073 |
| 10 | 106.3919 | 99.8077 | 110.9836 | 92.5373 | 102.1174 | 103.2716 | 112.8770 | 108.9608 | 109.4405 | 103.1487 |
| 11 | 108.8946 | 101.6865 | 107.5891 | 92.0913 | 103.8361 | 104.1746 | 113.8627 | 112.5068 | 111.7363 | 105.8819 |
| 12 | 109.7642 | 102.3973 | 110.5009 | 89.8371 | 101.9856 | 107.1210 | 112.8857 | 115.9297 | 115.8739 | 109.0137 |
| 13 | 111.1767 | 104.4874 | 111.0793 | 91.6727 | 101.4174 | 106.6319 | 114.5202 | 117.4139 | 115.1550 | 111.1470 |
| 14 | 113.4251 | 104.2640 | 110.7064 | 93.6239 | 101.0945 | 105.4803 | 113.3769 | 117.8885 | 117.6682 | 108.2874 |
| 15 | 116.8157 | 106.2459 | 114.5416 | 95.7000 | 101.0860 | 111.4305 | 110.4840 | 119.3207 | 118.3440 | 108.1152 |
| 16 | 114.7580 | 105.6422 | 111.8527 | 97.2413 | 104.7400 | 109.5663 | 112.3781 | 117.0403 | 122.1124 | 110.7738 |
| 17 | 112.8429 | 112.4222 | 114.5692 | 98.7439 | 105.3586 | 111.0616 | 111.6300 | 116.6243 | 122.7034 | 111.6617 |
| 18 | 114.0447 | 113.7530 | 115.5136 | 96.8947 | 104.3504 | 113.2845 | 112.9832 | 118.4505 | 121.9625 | 109.9677 |
| 19 | 113.9784 | 115.4403 | 119.4157 | 99.0011 | 102.5073 | 115.9892 | 112.2414 | 120.8933 | 121.2475 | 109.0435 |
| 20 | 117.4452 | 116.7474 | 120.6233 | 98.9680 | 103.5760 | 116.3123 | 113.9189 | 120.3777 | 126.7323 | 113.0643 |
| 21 | 116.8934 | 115.6908 | 123.3225 | 98.1570 | 103.8684 | 117.7135 | 116.4326 | 122.5269 | 130.0197 | 112.5751 |
| 22 | 118.6496 | 116.5949 | 126.0876 | 100.5612 | 104.6650 | 118.2001 | 117.9658 | 124.3952 | 134.9466 | 109.1979 |
| 23 | 121.2852 | 120.3267 | 124.9120 | 101.3898 | 102.1852 | 118.3388 | 119.3769 | 125.2153 | 134.2975 | 110.8196 |
| 24 | 125.1780 | 122.4705 | 127.7744 | 102.0190 | 102.2419 | 116.2995 | 118.9222 | 128.0933 | 133.6088 | 110.5085 |
| 25 | 125.1037 | 126.6231 | 129.9450 | 105.2140 | 101.5622 | 116.7142 | 119.9228 | 128.9108 | 134.6383 | 109.5566 |
| 26 | 122.9903 | 126.4665 | 129.5008 | 110.2034 | 102.8704 | 118.2586 | 120.3272 | 131.8682 | 131.6350 | 112.6493 |
| 27 | 120.1448 | 127.3241 | 127.6135 | 110.2456 | 103.9082 | 115.3976 | 120.1478 | 131.3456 | 134.1505 | 116.6650 |
| 28 | 120.2246 | 131.2065 | 133.5419 | 109.2452 | 104.9730 | 115.0159 | 124.0417 | 130.7958 | 132.7518 | 116.7153 |
| 29 | 121.7563 | 128.6313 | 137.8692 | 110.2568 | 104.1266 | 115.2281 | 127.4444 | 133.1579 | 137.3261 | 117.7116 |
| 30 | 121.5626 | 128.3567 | 137.5133 | 113.0814 | 105.9936 | 115.7926 | 126.8965 | 132.8335 | 140.1512 | 123.3293 |
| 31 | 124.1280 | 133.8420 | 140.3878 | 114.2768 | 110.0224 | 121.2967 | 129.2102 | 136.2383 | 136.7694 | 122.1553 |
| 32 | 128.2890 | 132.7650 | 139.0344 | 117.9987 | 114.6263 | 121.1933 | 130.6044 | 136.5756 | 141.1490 | 121.8156 |
| 33 | 126.5361 | 131.2195 | 139.6250 | 120.6027 | 116.7767 | 123.7318 | 134.1999 | 138.5765 | 139.0319 | 123.0198 |
| 34 | 127.7503 | 133.9258 | 137.8984 | 122.7177 | 123.7018 | 123.0120 | 134.7484 | 137.9556 | 139.6957 | 123.6781 |
| 35 | 132.5358 | 132.8261 | 139.2146 | 122.2183 | 122.3440 | 122.3781 | 141.2204 | 135.6231 | 138.6225 | 126.2487 |
| 36 | 131.8574 | 131.2339 | 142.1708 | 123.5596 | 127.7068 | 122.8727 | 143.8436 | 138.0567 | 140.3607 | 126.1084 |
| 37 | 132.2064 | 130.9742 | 145.0234 | 125.1558 | 130.2374 | 125.2381 | 147.1504 | 139.6670 | 140.4994 | 127.1148 |
| 38 | 142.3804 | 134.3285 | 149.8364 | 129.0597 | 131.9281 | 124.3225 | 145.3876 | 141.9373 | 140.4789 | 130.4430 |
| 39 | 145.6629 | 135.2274 | 152.0159 | 134.4235 | 134.6171 | 124.4586 | 144.1239 | 142.7403 | 142.2522 | 135.0435 |
| 40 | 143.3622 | 141.0192 | 149.7201 | 136.6954 | 135.7746 | 129.0378 | 145.3256 | 143.8363 | 144.1783 | 137.5642 |
| 41 | 144.8522 | 145.4935 | 146.7639 | 136.8990 | 137.9334 | 130.1878 | 141.3665 | 147.4859 | 142.5332 | 139.2955 |
| 42 | 148.3101 | 147.9550 | 141.6267 | 137.4609 | 136.5460 | 131.8880 | 143.5012 | 148.1760 | 144.3695 | 137.8910 |
| 43 | 150.8934 | 151.4552 | 141.7459 | 138.2781 | 133.0097 | 132.7997 | 149.4519 | 147.4183 | 145.8833 | 140.7833 |
| 44 | 152.2645 | 153.2625 | 140.4311 | 138.5792 | 134.5584 | 136.7119 | 148.8384 | 146.5922 | 145.7487 | 143.1024 |
| 45 | 157.5373 | 149.5493 | 141.1153 | 138.7607 | 138.1263 | 137.8327 | 151.1411 | 147.3789 | 145.8698 | 142.5222 |
| 46 | 156.5904 | 153.9292 | 142.0867 | 143.5561 | 139.0675 | 140.7774 | 149.8911 | 148.4625 | 147.6545 | 143.9919 |
| 47 | 162.6522 | 155.1763 | 150.4743 | 143.9188 | 143.2290 | 147.3402 | 148.3930 | 149.7465 | 147.6082 | 146.3043 |
| 48 | 166.4754 | 157.0955 | 151.3967 | 140.3653 | 142.9077 | 149.1436 | 147.0964 | 150.2476 | 150.2610 | 147.5793 |
| 49 | 167.5560 | 152.5763 | 151.3950 | 145.2022 | 143.2130 | 154.4110 | 145.1449 | 147.0667 | 151.3723 | 148.0131 |
| 50 | 171.6461 | 152.6757 | 155.6684 | 144.0289 | 142.4772 | 157.3700 | 142.3793 | 146.2929 | 152.7595 | 149.4244 |
| 51 | 173.3281 | 152.3267 | 156.5924 | 136.3546 | 146.2803 | 160.2804 | 142.0003 | 147.5529 | 150.8004 | 148.5162 |
| 52 | 170.1185 | 151.5859 | 155.2854 | 140.1332 | 148.7098 | 161.1152 | 143.1161 | 146.0948 | 150.1752 | 149.7502 |

The following 20 scenarios are equity scenarios with starting value of 100, with monthly steps over one year horizon.

**Monthly equity price over one year horizon - Scenarios 1 to 10**

| Month | Scenario 1 | Scenario 2 | Scenario 3 | Scenario 4 | Scenario 5 | Scenario 6 | Scenario 7 | Scenario 8 | Scenario 9 | Scenario 10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 |
| 1 | 95.2207 | 98.2644 | 93.2644 | 82.0308 | 97.3128 | 92.7091 | 98.0153 | 94.7481 | 96.6300 | 107.7423 |
| 2 | 94.2661 | 97.6913 | 97.5722 | 83.0715 | 94.8379 | 88.1819 | 101.6938 | 93.3412 | 97.0180 | 105.0775 |
| 3 | 87.8595 | 91.0979 | 92.8686 | 85.2758 | 94.7769 | 84.8910 | 100.5344 | 85.3718 | 90.5434 | 104.7303 |
| 4 | 81.9300 | 80.1818 | 95.2847 | 89.9735 | 101.9361 | 84.2472 | 98.7323 | 78.1680 | 91.0126 | 101.8168 |
| 5 | 80.3745 | 73.8789 | 86.8768 | 83.6347 | 101.2116 | 79.0808 | 92.7257 | 78.5419 | 89.9788 | 102.4787 |
| 6 | 79.0982 | 74.0352 | 84.2703 | 81.1228 | 101.5207 | 76.3769 | 91.5660 | 79.9211 | 90.3565 | 87.5902 |
| 7 | 72.3446 | 66.3290 | 76.1851 | 73.1402 | 99.7083 | 67.1256 | 87.9161 | 77.8994 | 70.8098 | 79.1764 |
| 8 | 69.3944 | 60.3566 | 73.8380 | 68.6280 | 72.6028 | 67.4251 | 80.4076 | 90.3618 | 69.0107 | 73.1234 |
| 9 | 60.7075 | 62.7510 | 70.4044 | 78.0264 | 71.5350 | 69.0774 | 78.7299 | 79.8591 | 71.5697 | 71.9689 |
| 10 | 57.5402 | 58.6160 | 64.5141 | 62.9287 | 68.7768 | 66.9007 | 72.0298 | 83.3764 | 70.2676 | 69.2260 |
| 11 | 51.5959 | 58.7823 | 61.8313 | 59.7655 | 68.6950 | 69.8328 | 61.9028 | 74.5982 | 76.2556 | 67.8927 |
| 12 | 49.7922 | 54.9144 | 57.5049 | 62.8909 | 64.0464 | 64.3109 | 64.4464 | 64.5551 | 64.9331 | 64.9677 |

**Monthly equity price over one year horizon - Scenarios 11 to 20**

| Month | Scenario 11 | Scenario 12 | Scenario 13 | Scenario 14 | Scenario 15 | Scenario 16 | Scenario 17 | Scenario 18 | Scenario 19 | Scenario 20 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 | 100.0000 |
| 1 | 103.3265 | 99.3251 | 96.7524 | 93.4987 | 98.1296 | 100.4458 | 102.0132 | 103.3459 | 101.9924 | 104.5266 |
| 2 | 103.4409 | 99.2216 | 107.8320 | 92.8193 | 100.7243 | 101.9858 | 115.2949 | 106.7555 | 110.5291 | 103.3073 |
| 3 | 111.1767 | 104.4874 | 111.0793 | 91.6727 | 101.4174 | 106.6319 | 114.5202 | 117.4139 | 115.1550 | 111.1470 |
| 4 | 114.0447 | 113.7530 | 115.5136 | 96.8947 | 104.3504 | 113.2845 | 112.9832 | 118.4505 | 121.9625 | 109.9677 |
| 5 | 118.6496 | 116.5949 | 126.0876 | 100.5612 | 104.6650 | 118.2001 | 117.9658 | 124.3952 | 134.9466 | 109.1979 |
| 6 | 122.9903 | 126.4665 | 129.5008 | 110.2034 | 102.8704 | 118.2586 | 120.3272 | 131.8682 | 131.6350 | 112.6493 |
| 7 | 124.1280 | 133.8420 | 140.3878 | 114.2768 | 110.0224 | 121.2967 | 129.2102 | 136.2383 | 136.7694 | 122.1553 |
| 8 | 132.5358 | 132.8261 | 139.2146 | 122.2183 | 122.3440 | 122.3781 | 141.2204 | 135.6231 | 138.6225 | 126.2487 |
| 9 | 145.6629 | 135.2274 | 152.0159 | 134.4235 | 134.6171 | 124.4586 | 144.1239 | 142.7403 | 142.2522 | 135.0435 |
| 10 | 152.2645 | 153.2625 | 140.4311 | 138.5792 | 134.5584 | 136.7119 | 148.8384 | 146.5922 | 145.7487 | 143.1024 |
| 11 | 166.4754 | 157.0955 | 151.3967 | 140.3653 | 142.9077 | 149.1436 | 147.0964 | 150.2476 | 150.2610 | 147.5793 |
| 12 | 170.1185 | 151.5859 | 155.2854 | 140.1332 | 148.7098 | 161.1152 | 143.1161 | 146.0948 | 150.1752 | 149.7502 |

> *Footnotes Footnote 1 Hedged cash flows should include hedged cash outflows and hedged cash inflows (e.g., fees). Return to footnote 1 referrer*

## Footnotes

Hedged cash flows should include hedged cash outflows and hedged cash inflows (e.g., fees).

Return to footnote 1 referrer

/* ===================================================================
   EPI FLASHCARDS — epi_flash_cards.js
   Card data + game logic
   =================================================================== */

// ===================================================================
// CARD DATA — 116 epidemiology terms
// ===================================================================
const CARDS = [
  { q: "What is the definition of epidemiology?", a: "Epidemiology is the study of the distribution and determinants of health-related states or events in specified populations, and the application of this study to control health problems.", ref: "Source: CDC Principles of Epidemiology", term: "epidemiology" },
  { q: "What is the natural history of a disease?", a: "The natural history of a disease refers to the progression of a disease process in an individual over time, from the onset to resolution or chronicity.", ref: "Source: Merck Veterinary Manual", term: "natural history of a disease" },
  { q: "What are the three components of the epidemiologic triad?", a: "The three components of the epidemiologic triad are the agent, the host, and the environment.", ref: "Source: CDC Principles of Epidemiology", term: "three components of the epidemiologic triad" },
  { q: "What is an epidemic?", a: "An epidemic is the occurrence of more cases of a disease than expected in a given area or among a specific group of people over a particular period of time.", ref: "Source: Principles of Epidemiology", term: "an epidemic" },
  { q: "What is the difference between incidence and prevalence?", a: "Incidence refers to the number of new cases of a disease in a population during a specific time, while prevalence refers to the total number of cases, both new and existing, in a population at a specific time.", ref: "Source: Merck Veterinary Manual", term: "difference between incidence and prevalence" },
  { q: "What is a case-control study?", a: "A case-control study is a type of observational study that compares individuals with a specific condition (cases) to those without the condition (controls) to identify risk factors.", ref: "Source: Principles of Epidemiology", term: "a case-control study" },
  { q: "What is herd immunity?", a: "Herd immunity occurs when a large portion of a population becomes immune to a disease, making its spread unlikely.", ref: "Source: CDC Principles of Epidemiology", term: "herd immunity" },
  { q: "What is the primary purpose of descriptive epidemiology?", a: "The primary purpose of descriptive epidemiology is to describe the distribution of diseases and health outcomes in terms of person, place, and time.", ref: "Source: Principles of Epidemiology", term: "primary purpose of descriptive epidemiology" },
  { q: "What is the role of an epidemiologist?", a: "An epidemiologist studies the distribution and determinants of health-related states or events and applies this knowledge to control health problems.", ref: "Source: Principles of Epidemiology", term: "role of an epidemiologist" },
  { q: "What is a cohort study?", a: "A cohort study is a type of observational study where a group of individuals who share a common characteristic is followed over time to observe outcomes.", ref: "Source: Merck Veterinary Manual", term: "a cohort study" },
  { q: "What is a pandemic?", a: "A pandemic is an epidemic that has spread over several countries or continents, usually affecting a large number of people.", ref: "Source: Principles of Epidemiology", term: "a pandemic" },
  { q: "What is the difference between a retrospective and a prospective study?", a: "A retrospective study looks backward in time to examine exposure to risk factors, while a prospective study follows participants forward in time to observe outcomes.", ref: "Source: Gordis Epidemiology", term: "difference between a retrospective and a prospective study" },
  { q: "What is a cross-sectional study?", a: "A cross-sectional study examines data on exposure and outcome at the same point in time in a population.", ref: "Source: Merck Veterinary Manual", term: "a cross-sectional study" },
  { q: "What are the steps of an outbreak investigation?", a: "Key steps include: establish a case definition, confirm the outbreak, identify cases, describe and orient data in terms of time, place, and person, develop hypotheses, test hypotheses, refine hypotheses, and implement control measures.", ref: "Source: CDC Principles of Epidemiology", term: "steps of an outbreak investigation" },
  { q: "What is an endemic?", a: "An endemic is the constant presence of a disease or infectious agent within a given geographic area or population group.", ref: "Source: Principles of Epidemiology", term: "an endemic" },
  { q: "What is the purpose of analytical epidemiology?", a: "Analytical epidemiology seeks to identify causes or risk factors for diseases and health-related events by testing specific hypotheses.", ref: "Source: Gordis Epidemiology", term: "purpose of analytical epidemiology" },
  { q: "What is attributable risk?", a: "Attributable risk is the difference in disease risk between exposed and unexposed groups, showing the amount of disease risk that can be attributed to a specific exposure.", ref: "Source: Merck Veterinary Manual", term: "attributable risk" },
  { q: "What is the incubation period?", a: "The incubation period is the time interval between exposure to an infectious agent and the appearance of the first signs or symptoms of the disease.", ref: "Source: Principles of Epidemiology", term: "incubation period" },
  { q: "What is the purpose of a case definition?", a: "A case definition provides a set of standard criteria for classifying whether an individual has a particular disease or health condition.", ref: "Source: CDC Principles of Epidemiology", term: "purpose of a case definition" },
  { q: "What is a confounding variable?", a: "A confounding variable is an extraneous factor that can distort the observed relationship between an exposure and an outcome.", ref: "Source: Gordis Epidemiology", term: "a confounding variable" },
  { q: "What is a point source epidemic?", a: "A point source epidemic occurs when a group of people is exposed to the same source of infection at the same time.", ref: "Source: Principles of Epidemiology", term: "a point source epidemic" },
  { q: "What is a propagating epidemic?", a: "A propagating epidemic occurs when the infection spreads person-to-person over time.", ref: "Source: CDC Principles of Epidemiology", term: "a propagating epidemic" },
  { q: "What is a secondary attack rate?", a: "The secondary attack rate is the proportion of susceptible individuals who develop the disease after exposure to a primary case.", ref: "Source: Gordis Epidemiology", term: "a secondary attack rate" },
  { q: "What is the iceberg concept of disease?", a: "The iceberg concept refers to the idea that for every clinically apparent case of disease, there are many subclinical, undiagnosed, or asymptomatic cases.", ref: "Source: Principles of Epidemiology", term: "iceberg concept of disease" },
  { q: "What is surveillance in epidemiology?", a: "Surveillance is the ongoing systematic collection, analysis, and interpretation of health data for planning, implementation, and evaluation of public health practice.", ref: "Source: CDC Principles of Epidemiology", term: "surveillance in epidemiology" },
  { q: "What is the difference between active and passive surveillance?", a: "Active surveillance involves proactive data collection by health authorities, while passive surveillance relies on reports submitted by health providers.", ref: "Source: Gordis Epidemiology", term: "difference between active and passive surveillance" },
  { q: "What is the basic reproductive number (R0)?", a: "The basic reproductive number (R0) is the average number of secondary cases produced by one primary case in a completely susceptible population.", ref: "Source: Principles of Epidemiology", term: "basic reproductive number (R0)" },
  { q: "What is an odds ratio?", a: "An odds ratio is a measure of association that quantifies the odds of exposure among cases relative to the odds of exposure among controls.", ref: "Source: Gordis Epidemiology", term: "an odds ratio" },
  { q: "What is a confidence interval?", a: "A confidence interval is a range of values that likely contain the true value of a parameter, calculated from sample data.", ref: "Source: Merck Veterinary Manual", term: "a confidence interval" },
  { q: "What is the null hypothesis in epidemiology?", a: "The null hypothesis is the assumption that there is no association between exposure and outcome.", ref: "Source: Principles of Epidemiology", term: "null hypothesis in epidemiology" },
  { q: "What is the role of randomization in a clinical trial?", a: "Randomization helps ensure that treatment groups are comparable and eliminates bias in the allocation of treatments.", ref: "Source: Gordis Epidemiology", term: "role of randomization in a clinical trial" },
  { q: "What is a p-value in epidemiology?", a: "A p-value indicates the probability of observing the study results, or something more extreme, if the null hypothesis is true.", ref: "Source: Principles of Epidemiology", term: "a p-value in epidemiology" },
  { q: "What is a Type I error?", a: "A Type I error occurs when a null hypothesis is rejected even though it is true.", ref: "Source: Merck Veterinary Manual", term: "a Type I error" },
  { q: "What is a Type II error?", a: "A Type II error occurs when a null hypothesis is not rejected even though it is false.", ref: "Source: Gordis Epidemiology", term: "a Type II error" },
  { q: "What is recall bias?", a: "Recall bias occurs when there are differences in the accuracy or completeness of the information recalled by study participants.", ref: "Source: Principles of Epidemiology", term: "recall bias" },
  { q: "What is selection bias?", a: "Selection bias occurs when the sample selected for a study is not representative of the target population.", ref: "Source: Merck Veterinary Manual", term: "selection bias" },
  { q: "What is effect modification?", a: "Effect modification occurs when the effect of an exposure on an outcome differs depending on the level of another variable.", ref: "Source: Gordis Epidemiology", term: "effect modification" },
  { q: "What is the purpose of matching in a case-control study?", a: "Matching is used to control confounding by ensuring cases and controls are comparable for specific variables.", ref: "Source: Principles of Epidemiology", term: "purpose of matching in a case-control study" },
  { q: "What is lead-time bias?", a: "Lead-time bias occurs when earlier detection of a disease falsely appears to improve survival rates without actual improvements in outcomes.", ref: "Source: Merck Veterinary Manual", term: "lead-time bias" },
  { q: "What is length-time bias?", a: "Length-time bias occurs when slower-progressing, less aggressive cases of a disease are more likely to be detected by screening than fast-progressing cases.", ref: "Source: Gordis Epidemiology", term: "length-time bias" },
  { q: "What is primary prevention?", a: "Primary prevention involves measures taken to prevent the occurrence of disease, such as vaccination or lifestyle modifications.", ref: "Source: Principles of Epidemiology", term: "primary prevention" },
  { q: "What is secondary prevention?", a: "Secondary prevention focuses on early detection and intervention to stop the progression of a disease.", ref: "Source: Gordis Epidemiology", term: "secondary prevention" },
  { q: "What is tertiary prevention?", a: "Tertiary prevention involves measures to reduce complications and improve quality of life for people with a disease.", ref: "Source: Merck Veterinary Manual", term: "tertiary prevention" },
  { q: "What is the difference between sensitivity and specificity?", a: "Sensitivity is the ability of a test to correctly identify those with the disease, while specificity is the ability to correctly identify those without the disease.", ref: "Source: CDC Principles of Epidemiology", term: "difference between sensitivity and specificity" },
  { q: "What is the purpose of a control group in a study?", a: "The control group provides a baseline for comparison to determine the effect of an exposure or intervention.", ref: "Source: Principles of Epidemiology", term: "purpose of a control group in a study" },
  { q: "What is a risk ratio?", a: "A risk ratio compares the risk of a health outcome in an exposed group to the risk in an unexposed group.", ref: "Source: Gordis Epidemiology", term: "a risk ratio" },
  { q: "What is a case-fatality rate?", a: "The case-fatality rate is the proportion of individuals with a specific condition who die from that condition within a specified time.", ref: "Source: Merck Veterinary Manual", term: "a case-fatality rate" },
  { q: "What is a p-value?", a: "A p-value is the probability of obtaining the observed results, or more extreme ones, assuming the null hypothesis is true.", ref: "Source: Gordis Epidemiology", term: "a p-value" },
  { q: "What is confounding in epidemiology?", a: "Confounding occurs when an extraneous variable is associated with both the exposure and the outcome, distorting the true relationship.", ref: "Source: Principles of Epidemiology", term: "confounding in epidemiology" },
  { q: "What is an attributable fraction?", a: "The attributable fraction is the proportion of cases in the population that can be attributed to a specific exposure.", ref: "Source: Merck Veterinary Manual", term: "an attributable fraction" },
  { q: "What is a standard error?", a: "The standard error is the standard deviation of the sampling distribution of a statistic, measuring its precision.", ref: "Source: CDC Principles of Epidemiology", term: "a standard error" },
  { q: "What is the difference between absolute risk reduction and relative risk reduction?", a: "Absolute risk reduction is the difference in risk between two groups, while relative risk reduction is the proportionate reduction in risk.", ref: "Source: Gordis Epidemiology", term: "difference between absolute risk reduction and relative risk reduction" },
  { q: "What is an ecological study?", a: "An ecological study analyzes data at the population or group level rather than the individual level.", ref: "Source: Principles of Epidemiology", term: "an ecological study" },
  { q: "What is statistical power?", a: "Statistical power is the probability of correctly rejecting the null hypothesis when it is false.", ref: "Source: Merck Veterinary Manual", term: "statistical power" },
  { q: "What is the Kaplan-Meier method?", a: "The Kaplan-Meier method is a statistical technique used to estimate survival probabilities over time.", ref: "Source: CDC Principles of Epidemiology", term: "Kaplan-Meier method" },
  { q: "What is a hazard ratio?", a: "A hazard ratio is a measure of how often a particular event happens in one group compared to another over time.", ref: "Source: Gordis Epidemiology", term: "a hazard ratio" },
  { q: "What is the difference between correlation and causation?", a: "Correlation is a statistical association between two variables, while causation indicates one variable directly affects the other.", ref: "Source: Principles of Epidemiology", term: "difference between correlation and causation" },
  { q: "What is a cohort study?", a: "A cohort study follows a group of individuals over time to determine the incidence of disease and its association with exposures.", ref: "Source: Principles of Epidemiology", term: "a cohort study" },
  { q: "What is a case definition in an outbreak investigation?", a: "A case definition is a set of standard criteria used to classify whether an individual has a specific disease or condition.", ref: "Source: CDC Principles of Epidemiology", term: "a case definition in an outbreak investigation" },
  { q: "What is the difference between a pandemic and an epidemic?", a: "An epidemic is localized to a specific region or population, while a pandemic spans multiple countries or continents.", ref: "Source: Gordis Epidemiology", term: "difference between a pandemic and an epidemic" },
  { q: "What is the role of surveillance in public health?", a: "Surveillance monitors disease trends and provides data for planning, implementing, and evaluating public health interventions.", ref: "Source: Principles of Epidemiology", term: "role of surveillance in public health" },
  { q: "What is the attack rate in epidemiology?", a: "The attack rate is the proportion of people who develop a disease among those at risk during a specific time.", ref: "Source: Merck Veterinary Manual", term: "attack rate in epidemiology" },
  { q: "What is the difference between cross-sectional and longitudinal studies?", a: "Cross-sectional studies assess data at one point in time, while longitudinal studies collect data over a period of time.", ref: "Source: Gordis Epidemiology", term: "difference between cross-sectional and longitudinal studies" },
  { q: "What is a confounding variable?", a: "A confounding variable is an external factor that distorts the observed relationship between exposure and outcome.", ref: "Source: Principles of Epidemiology", term: "a confounding variable" },
  { q: "What is a null hypothesis?", a: "The null hypothesis assumes no association between exposure and outcome, serving as a baseline for testing.", ref: "Source: CDC Principles of Epidemiology", term: "a null hypothesis" },
  { q: "What is lead-time bias?", a: "Lead-time bias occurs when earlier detection of a disease falsely appears to improve survival rates without affecting outcomes.", ref: "Source: Gordis Epidemiology", term: "lead-time bias" },
  { q: "What is ecological fallacy?", a: "Ecological fallacy occurs when assumptions about individuals are based on group-level data.", ref: "Source: Principles of Epidemiology", term: "ecological fallacy" },
  { q: "What is an odds ratio?", a: "An odds ratio quantifies the odds of exposure among cases relative to controls, used in case-control studies.", ref: "Source: Merck Veterinary Manual", term: "an odds ratio" },
  { q: "What is statistical significance?", a: "Statistical significance indicates the likelihood that observed results are not due to chance, typically assessed with a p-value.", ref: "Source: Gordis Epidemiology", term: "statistical significance" },
  { q: "What is herd immunity?", a: "Herd immunity occurs when enough people in a population are immune to a disease, reducing its spread.", ref: "Source: Principles of Epidemiology", term: "herd immunity" },
  { q: "What is the purpose of randomization in clinical trials?", a: "Randomization eliminates selection bias by assigning participants to treatment groups by chance.", ref: "Source: CDC Principles of Epidemiology", term: "purpose of randomization in clinical trials" },
  { q: "What is bias in epidemiological studies?", a: "Bias is a systematic error in study design or data analysis that leads to incorrect conclusions.", ref: "Source: Gordis Epidemiology", term: "bias in epidemiological studies" },
  { q: "What is length-time bias?", a: "Length-time bias occurs when slower-progressing diseases are more likely to be detected by screening, giving a false impression of improved survival.", ref: "Source: Principles of Epidemiology", term: "length-time bias" },
  { q: "What is a p-value?", a: "A p-value is the probability of obtaining results as extreme as those observed, assuming the null hypothesis is true.", ref: "Source: Gordis Epidemiology", term: "a p-value" },
  { q: "What is a Kaplan-Meier curve?", a: "A Kaplan-Meier curve is a graphical representation of survival probabilities over time.", ref: "Source: CDC Principles of Epidemiology", term: "a Kaplan-Meier curve" },
  { q: "What is the purpose of blinding in a study?", a: "Blinding prevents bias by ensuring that participants and/or researchers do not know who is receiving the treatment or placebo.", ref: "Source: Gordis Epidemiology", term: "purpose of blinding in a study" },
  { q: "What is an attributable risk percent?", a: "An attributable risk percent quantifies the proportion of the risk of a disease in the exposed group that is due to the exposure.", ref: "Source: Principles of Epidemiology", term: "an attributable risk percent" },
  { q: "What is an epidemic curve?", a: "An epidemic curve is a graphical representation of the number of cases of disease over time.", ref: "Source: Merck Veterinary Manual", term: "an epidemic curve" },
  { q: "What is a secondary attack rate?", a: "The secondary attack rate measures the spread of disease in a specific group, typically among contacts of primary cases.", ref: "Source: Gordis Epidemiology", term: "a secondary attack rate" },
  { q: "What is a confidence interval?", a: "A confidence interval is a range of values that is likely to contain the true population parameter.", ref: "Source: Principles of Epidemiology", term: "a confidence interval" },
  { q: "What is incidence density?", a: "Incidence density is the rate of new cases of a disease per unit of person-time at risk.", ref: "Source: Merck Veterinary Manual", term: "incidence density" },
  { q: "What is a proportional mortality ratio?", a: "A proportional mortality ratio compares the number of deaths from a specific cause to the total number of deaths in a population.", ref: "Source: CDC Principles of Epidemiology", term: "a proportional mortality ratio" },
  { q: "What is relative risk reduction?", a: "Relative risk reduction is the proportional decrease in risk between the control group and the experimental group.", ref: "Source: Gordis Epidemiology", term: "relative risk reduction" },
  { q: "What is the purpose of matching in case-control studies?", a: "Matching ensures that cases and controls are comparable with respect to confounding factors.", ref: "Source: Principles of Epidemiology", term: "purpose of matching in case-control studies" },
  { q: "What is a cross-sectional study?", a: "A cross-sectional study examines data on exposure and outcome at a single point in time.", ref: "Source: Merck Veterinary Manual", term: "a cross-sectional study" },
  { q: "What is a propagating epidemic?", a: "A propagating epidemic is characterized by person-to-person transmission, resulting in a series of progressively taller peaks in cases.", ref: "Source: Gordis Epidemiology", term: "a propagating epidemic" },
  { q: "If a town reports 50 new cases of a disease in a population of 5,000 during a single month, what is the incidence rate?", a: "The incidence rate is 50/5,000 = 1%, or 10 cases per 1,000 population per month.", ref: "Source: Principles of Epidemiology", term: "incidence rate" },
  { q: "A study finds that smokers have a lung cancer risk 10 times higher than non-smokers. What measure does this ratio represent?", a: "This represents the relative risk of lung cancer among smokers compared to non-smokers.", ref: "Source: Gordis Epidemiology", term: "A study finds that smokers have a lung cancer risk 10 times " },
  { q: "In a recent outbreak, most cases occurred within 24 hours of a wedding banquet. What type of epidemic does this suggest?", a: "This suggests a point-source epidemic, where all cases result from a single exposure event.", ref: "Source: Principles of Epidemiology", term: "epidemic does this suggest" },
  { q: "What if a diagnostic test has a sensitivity of 90%? What does this mean for disease detection?", a: "A sensitivity of 90% means the test correctly identifies 90% of individuals with the disease, but 10% may be false negatives.", ref: "Source: Merck Veterinary Manual", term: "What if a diagnostic test has a sensitivity of 90% What does" },
  { q: "If a screening program detects many asymptomatic cases of a disease, what type of bias might this introduce?", a: "This could introduce length-time bias, as slower-progressing cases are more likely to be detected.", ref: "Source: Gordis Epidemiology", term: "bias might this introduce" },
  { q: "During an outbreak, 20 cases are reported in a group of 100 exposed people. What is the attack rate?", a: "The attack rate is 20/100 = 20%.", ref: "Source: Principles of Epidemiology", term: "attack rate" },
  { q: "If an odds ratio is calculated as 2.5 in a case-control study, what does this indicate?", a: "An odds ratio of 2.5 indicates that the odds of exposure are 2.5 times higher in cases than in controls.", ref: "Source: Gordis Epidemiology", term: "If an odds ratio is calculated as 2.5 in a case-control stud" },
  { q: "A vaccine trial shows a relative risk reduction of 80%. What does this imply?", a: "An 80% relative risk reduction means that the vaccinated group has 80% fewer cases compared to the unvaccinated group.", ref: "Source: Principles of Epidemiology", term: "A vaccine trial shows a relative risk reduction of 80%. What" },
  { q: "If a disease is highly prevalent but has low incidence, what does this suggest about its nature?", a: "This suggests the disease is chronic, with many existing cases but few new cases developing over time.", ref: "Source: Merck Veterinary Manual", term: "If a disease is highly prevalent but has low incidence, what" },
  { q: "What if a p-value is reported as 0.03? How should this result be interpreted?", a: "A p-value of 0.03 indicates a 3% probability that the observed results occurred by chance, often considered statistically significant.", ref: "Source: Gordis Epidemiology", term: "What if a p-value is reported as 0.03 How should this result" },
  { q: "What if an epidemic curve shows multiple peaks? What could this indicate?", a: "Multiple peaks in an epidemic curve often indicate a propagating epidemic with person-to-person transmission.", ref: "Source: Principles of Epidemiology", term: "What if an epidemic curve shows multiple peaks What could th" },
  { q: "If a test has a specificity of 95%, what does this mean for non-disease detection?", a: "A specificity of 95% means the test correctly identifies 95% of people without the disease, with a 5% false-positive rate.", ref: "Source: Merck Veterinary Manual", term: "If a test has a specificity of 95%, what does this mean for " },
  { q: "A city implements a flu vaccine program, and the incidence of flu decreases significantly. What is this an example of?", a: "This is an example of primary prevention, reducing the occurrence of disease through vaccination.", ref: "Source: Gordis Epidemiology", term: "this an example of" },
  { q: "What if a study finds a relative risk of 1.0 between two groups? What does this imply?", a: "A relative risk of 1.0 implies there is no difference in risk between the two groups.", ref: "Source: Principles of Epidemiology", term: "What if a study finds a relative risk of 1.0 between two gro" },
  { q: "If a population has high herd immunity, what would you expect to happen to disease transmission?", a: "High herd immunity reduces disease transmission, as there are fewer susceptible individuals for the pathogen to infect.", ref: "Source: CDC Principles of Epidemiology", term: "If a population has high herd immunity, what would you expec" },
  { q: "A study reports a confidence interval of 1.5 to 3.0 for an odds ratio. What does this mean?", a: "This indicates that the true odds ratio is likely between 1.5 and 3.0, with a given confidence level (e.g., 95%).", ref: "Source: Gordis Epidemiology", term: "this" },
  { q: "If a screening test detects more cases in one population than another, what factors could explain this?", a: "Factors could include differences in disease prevalence, access to healthcare, or the sensitivity and specificity of the test.", ref: "Source: Principles of Epidemiology", term: "this" },
  { q: "If a disease has an incubation period of 2-4 days, what does this suggest about its control measures?", a: "Control measures need to be rapid to identify and isolate cases before they become infectious.", ref: "Source: Merck Veterinary Manual", term: "If a disease has an incubation period of 2-4 days, what does" },
  { q: "What if a new diagnostic test identifies all cases but also many false positives? How could this impact its use?", a: "The test has high sensitivity but low specificity, leading to overdiagnosis and possibly unnecessary treatments.", ref: "Source: Gordis Epidemiology", term: "What if a new diagnostic test identifies all cases but also " },
  { q: "A researcher notes that areas with more hospitals have higher mortality rates. What type of bias could explain this?", a: "This could be an example of ecological fallacy, assuming a group-level association applies to individuals.", ref: "Source: Principles of Epidemiology", term: "this" },
  { q: "What if an outbreak investigation identifies a food item as the source of infection? What should happen next?", a: "The food item should be recalled, and public warnings issued to prevent further exposure.", ref: "Source: CDC Principles of Epidemiology", term: "What if an outbreak investigation identifies a food item as " },
  { q: "If a vaccine has an efficacy of 70%, what does this mean?", a: "Vaccine efficacy of 70% means a 70% reduction in disease incidence among the vaccinated group compared to the unvaccinated group.", ref: "Source: Gordis Epidemiology", term: "this" },
  { q: "If a disease cluster is identified in a workplace, what steps should investigators take?", a: "Investigators should define cases, collect exposure histories, and test hypotheses about the source and transmission route.", ref: "Source: Principles of Epidemiology", term: "If a disease cluster is identified in a workplace, what step" },
  { q: "What if a study only recruits participants from hospitals? What type of bias might occur?", a: "This could result in selection bias, as hospital patients may not represent the general population.", ref: "Source: Merck Veterinary Manual", term: "bias might occur" },
  { q: "What if a screening test for cancer improves survival time without reducing mortality? What bias might this indicate?", a: "This suggests lead-time bias, where early detection does not change the natural history of the disease.", ref: "Source: Gordis Epidemiology", term: "What if a screening test for cancer improves survival time w" },
  { q: "A rural village reports a sudden spike in diarrheal disease after a festival. What type of epidemic does this suggest?", a: "This suggests a point-source epidemic, likely linked to contaminated food or water at the festival.", ref: "Source: Principles of Epidemiology", term: "epidemic does this suggest" },
  { q: "What if a study’s confidence interval for an odds ratio includes 1.0? How should this result be interpreted?", a: "If the confidence interval includes 1.0, the result is not statistically significant, as the null hypothesis cannot be rejected.", ref: "Source: Merck Veterinary Manual", term: "What if a study’s confidence interval for an odds ratio incl" },
  { q: "If a disease has a high basic reproductive number (R0), what does this imply about its spread?", a: "A high R0 indicates the disease is highly transmissible and likely to spread widely without intervention.", ref: "Source: Gordis Epidemiology", term: "If a disease has a high basic reproductive number (R0), what" },
  { q: "If a study finds a new intervention significantly reduces mortality, what should researchers consider next?", a: "Researchers should evaluate the intervention’s feasibility, cost-effectiveness, and potential side effects before widespread implementation.", ref: "Source: Principles of Epidemiology", term: "If a study finds a new intervention significantly reduces mo" },
  { q: "If a disease is endemic in a region, what does this mean about its occurrence?", a: "An endemic disease is consistently present in a population or region, often at predictable levels.", ref: "Source: CDC Principles of Epidemiology", term: "If a disease is endemic in a region, what does this mean abo" }
];

// ===================================================================
// APP STATE
// ===================================================================
const state = {
  deck: [],           // active deck (indices into CARDS)
  position: 0,        // current index in deck
  reviewed: new Set(), // which card indices have been seen (by CARDS index)
  bookmarks: new Set(), // bookmarked CARDS indices
  isFlipped: false,
  timerMode: false,   // false = manual, true = timer
  timerDuration: 10,  // seconds
  timerInterval: null,
  timerRemaining: 0,
  shuffle: true,
  running: false,
};

// ===================================================================
// DOM REFS
// ===================================================================
const dom = {
  // Card
  flashcard: () => document.getElementById('flashcard'),
  cardQuestion: () => document.getElementById('card-question'),
  cardAnswer: () => document.getElementById('card-answer'),
  cardRef: () => document.getElementById('card-ref'),
  cardScene: () => document.getElementById('card-scene'),
  emptyState: () => document.getElementById('empty-state'),

  // Timer ring
  timerWrap: () => document.getElementById('timer-ring-wrap'),
  timerFill: () => document.getElementById('timer-ring-fill'),
  timerText: () => document.getElementById('timer-ring-text'),

  // Controls
  btnManual: () => document.getElementById('btn-mode-manual'),
  btnTimer: () => document.getElementById('btn-mode-timer'),
  timerOptions: () => document.getElementById('timer-options'),
  timerSelect: () => document.getElementById('timer-select'),
  shuffleCheck: () => document.getElementById('shuffle-check'),

  // Counter
  counterNumber: () => document.getElementById('counter-number'),
  counterTotal: () => document.getElementById('counter-total'),
  progressFill: () => document.getElementById('progress-fill'),

  // Nav
  btnPrev: () => document.getElementById('btn-prev'),
  btnNext: () => document.getElementById('btn-next'),
  btnFlip: () => document.getElementById('btn-flip'),
  btnStart: () => document.getElementById('btn-start'),
  btnRestart: () => document.getElementById('btn-restart'),

  // Card back actions
  btnLearnMore: () => document.getElementById('btn-learn-more'),
  btnBookmark: () => document.getElementById('btn-bookmark'),

  // Bookmarks section
  bookmarksSection: () => document.getElementById('bookmarks-section'),
  bookmarksTextarea: () => document.getElementById('bookmarks-textarea'),
  bookmarkCountBadge: () => document.getElementById('bookmark-count-badge'),
  btnCopy: () => document.getElementById('btn-copy'),
  btnClearBookmarks: () => document.getElementById('btn-clear-bookmarks'),
  copyFeedback: () => document.getElementById('copy-feedback'),

  // Theme toggle
  themeToggle: () => document.getElementById('theme-toggle'),

  // Toast
  toastArea: () => document.getElementById('toast-area'),
};

// ===================================================================
// UTILITIES
// ===================================================================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showToast(msg) {
  const area = dom.toastArea();
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  area.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

function buildLearnMoreURL(term) {
  const query = encodeURIComponent(term + ' epidemiology');
  const siteRestrict = encodeURIComponent('site:edu OR site:gov OR site:who.int OR site:cdc.gov OR site:nih.gov OR site:pubmed.ncbi.nlm.nih.gov');
  return `https://www.google.com/search?q=${query}+(${siteRestrict})`;
}

// ===================================================================
// TIMER LOGIC
// ===================================================================
const TIMER_CIRCUMFERENCE = 2 * Math.PI * 22; // r=22 in SVG

function startTimer() {
  clearTimer();
  if (!state.timerMode || state.isFlipped) return;

  state.timerRemaining = state.timerDuration;
  updateTimerRing(state.timerDuration, state.timerDuration);

  const fill = dom.timerFill();
  const wrap = dom.timerWrap();
  wrap.classList.add('visible');
  fill.classList.remove('urgent');

  state.timerInterval = setInterval(() => {
    state.timerRemaining--;
    updateTimerRing(state.timerRemaining, state.timerDuration);

    if (state.timerRemaining <= 3 && state.timerRemaining > 0) {
      fill.classList.add('urgent');
    }

    if (state.timerRemaining <= 0) {
      clearTimer();
      flipCard(); // auto-flip
    }
  }, 1000);
}

function clearTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  const wrap = dom.timerWrap();
  if (wrap) wrap.classList.remove('visible');
}

function updateTimerRing(remaining, total) {
  const fill = dom.timerFill();
  const text = dom.timerText();
  if (!fill || !text) return;

  const pct = remaining / total;
  const offset = TIMER_CIRCUMFERENCE * (1 - pct);
  fill.style.strokeDashoffset = offset;
  text.textContent = remaining;
}

// ===================================================================
// CARD RENDERING
// ===================================================================
function currentCard() {
  const idx = state.deck[state.position];
  return CARDS[idx];
}

function renderCard() {
  const card = currentCard();
  if (!card) return;

  const el = dom.flashcard();
  // Reset flip
  el.classList.remove('is-flipped');
  state.isFlipped = false;

  dom.cardQuestion().textContent = card.q;
  dom.cardAnswer().textContent = card.a;
  dom.cardRef().textContent = card.ref;

  // Learn more link
  const learnBtn = dom.btnLearnMore();
  learnBtn.href = buildLearnMoreURL(card.term);

  // Bookmark state
  const cardIdx = state.deck[state.position];
  const bBtn = dom.btnBookmark();
  if (state.bookmarks.has(cardIdx)) {
    bBtn.classList.add('is-bookmarked');
    bBtn.setAttribute('aria-label', 'Remove bookmark');
    bBtn.querySelector('.btn-bookmark-label').textContent = 'Bookmarked';
  } else {
    bBtn.classList.remove('is-bookmarked');
    bBtn.setAttribute('aria-label', 'Bookmark this term');
    bBtn.querySelector('.btn-bookmark-label').textContent = 'Mark for review';
  }

  updateCounter();

  // Start timer if enabled
  if (state.timerMode) {
    startTimer();
  }
}

// ===================================================================
// FLIP
// ===================================================================
function flipCard() {
  if (!state.running) return;
  const el = dom.flashcard();
  clearTimer();

  if (!state.isFlipped) {
    el.classList.add('is-flipped');
    state.isFlipped = true;
    // Mark as reviewed
    const cardIdx = state.deck[state.position];
    if (!state.reviewed.has(cardIdx)) {
      state.reviewed.add(cardIdx);
      updateCounter();
    }
  } else {
    el.classList.remove('is-flipped');
    state.isFlipped = false;
    if (state.timerMode) startTimer();
  }
}

// ===================================================================
// NAVIGATION
// ===================================================================
function goNext() {
  if (!state.running) return;
  clearTimer();
  if (state.position < state.deck.length - 1) {
    state.position++;
    renderCard();
  } else {
    // End of deck
    showToast(`Deck complete! You reviewed all ${state.deck.length} cards.`);
  }
}

function goPrev() {
  if (!state.running) return;
  clearTimer();
  if (state.position > 0) {
    state.position--;
    renderCard();
  }
}

// ===================================================================
// COUNTER & PROGRESS
// ===================================================================
function updateCounter() {
  const reviewed = state.reviewed.size;
  const total = CARDS.length;
  dom.counterNumber().textContent = reviewed;
  dom.counterTotal().textContent = total;
  const pct = (reviewed / total) * 100;
  dom.progressFill().style.width = pct + '%';
}

// ===================================================================
// START / RESTART
// ===================================================================
function startDeck() {
  state.deck = shuffle ? buildDeck() : buildDeck();
  state.position = 0;
  state.running = true;

  // Show card scene, hide empty state
  dom.cardScene().style.display = '';
  dom.emptyState().style.display = 'none';

  // Show nav buttons
  document.getElementById('nav-row').style.display = '';
  document.getElementById('btn-start').style.display = 'none';
  document.getElementById('btn-restart').style.display = '';

  renderCard();
}

function buildDeck() {
  const indices = CARDS.map((_, i) => i);
  return state.shuffle ? shuffle(indices) : indices;
}

function restartDeck() {
  clearTimer();
  state.reviewed.clear();
  state.deck = buildDeck();
  state.position = 0;
  state.isFlipped = false;
  renderCard();
  showToast('Deck restarted!');
  updateCounter();
}

// ===================================================================
// BOOKMARKS
// ===================================================================
function toggleBookmark() {
  const cardIdx = state.deck[state.position];
  const card = CARDS[cardIdx];
  const bBtn = dom.btnBookmark();

  if (state.bookmarks.has(cardIdx)) {
    state.bookmarks.delete(cardIdx);
    bBtn.classList.remove('is-bookmarked');
    bBtn.querySelector('.btn-bookmark-label').textContent = 'Mark for review';
    showToast('Bookmark removed');
  } else {
    state.bookmarks.add(cardIdx);
    bBtn.classList.add('is-bookmarked');
    bBtn.querySelector('.btn-bookmark-label').textContent = 'Bookmarked';
    showToast('Term marked for review!');
  }

  updateBookmarksPanel();
}

function updateBookmarksPanel() {
  const count = state.bookmarks.size;
  dom.bookmarkCountBadge().textContent = count;

  if (count === 0) {
    dom.bookmarksTextarea().style.display = 'none';
    document.getElementById('bookmarks-actions').style.display = 'none';
    document.getElementById('bookmarks-empty-msg').style.display = '';
  } else {
    dom.bookmarksTextarea().style.display = '';
    document.getElementById('bookmarks-actions').style.display = '';
    document.getElementById('bookmarks-empty-msg').style.display = 'none';
  }

  // Build text content
  const lines = [];
  let i = 1;
  state.bookmarks.forEach(idx => {
    const c = CARDS[idx];
    lines.push(`${i}. TERM: ${c.q}`);
    lines.push(`   ANSWER: ${c.a}`);
    if (c.ref) lines.push(`   ${c.ref}`);
    lines.push('');
    i++;
  });
  dom.bookmarksTextarea().value = lines.join('\n');
}

function copyBookmarks() {
  const text = dom.bookmarksTextarea().value;
  if (!text.trim()) return;
  navigator.clipboard.writeText(text).then(() => {
    const fb = dom.copyFeedback();
    fb.classList.add('visible');
    setTimeout(() => fb.classList.remove('visible'), 2000);
  }).catch(() => {
    // Fallback
    dom.bookmarksTextarea().select();
    document.execCommand('copy');
    showToast('Copied to clipboard!');
  });
}

function clearBookmarks() {
  state.bookmarks.clear();
  updateBookmarksPanel();
  // Reset all bookmark buttons
  const bBtn = dom.btnBookmark();
  if (bBtn) {
    bBtn.classList.remove('is-bookmarked');
    bBtn.querySelector('.btn-bookmark-label').textContent = 'Mark for review';
  }
  showToast('All bookmarks cleared.');
}

// ===================================================================
// THEME TOGGLE
// ===================================================================
function initTheme() {
  const html = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = prefersDark ? 'dark' : 'light';
  html.setAttribute('data-theme', theme);
  updateThemeIcon(theme);

  dom.themeToggle().addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
  });
}

function updateThemeIcon(theme) {
  const btn = dom.themeToggle();
  if (theme === 'dark') {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    btn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    btn.setAttribute('aria-label', 'Switch to dark mode');
  }
}

// ===================================================================
// EVENT LISTENERS
// ===================================================================
function initEvents() {
  // Mode toggle
  dom.btnManual().addEventListener('click', () => {
    state.timerMode = false;
    dom.btnManual().classList.add('active');
    dom.btnTimer().classList.remove('active');
    dom.timerOptions().style.display = 'none';
    clearTimer();
  });

  dom.btnTimer().addEventListener('click', () => {
    state.timerMode = true;
    dom.btnTimer().classList.add('active');
    dom.btnManual().classList.remove('active');
    dom.timerOptions().style.display = '';
    if (state.running && !state.isFlipped) startTimer();
  });

  // Timer duration
  dom.timerSelect().addEventListener('change', (e) => {
    state.timerDuration = parseInt(e.target.value, 10);
    if (state.timerMode && state.running && !state.isFlipped) {
      startTimer();
    }
  });

  // Shuffle
  dom.shuffleCheck().addEventListener('change', (e) => {
    state.shuffle = e.target.checked;
  });

  // Card click to flip
  dom.flashcard().addEventListener('click', () => {
    if (!state.isFlipped) flipCard();
  });

  // Flip button
  dom.btnFlip().addEventListener('click', () => flipCard());

  // Nav
  dom.btnNext().addEventListener('click', () => goNext());
  dom.btnPrev().addEventListener('click', () => goPrev());

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!state.running) return;
    const tag = document.activeElement?.tagName;
    if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT') return;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        goNext();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        goPrev();
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        flipCard();
        break;
      case 'b':
      case 'B':
        if (state.isFlipped) toggleBookmark();
        break;
    }
  });

  // Start
  dom.btnStart().addEventListener('click', () => startDeck());

  // Restart
  dom.btnRestart().addEventListener('click', () => restartDeck());

  // Bookmark
  dom.btnBookmark().addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBookmark();
  });

  // Bookmarks panel toggle
  document.getElementById('bookmarks-header').addEventListener('click', () => {
    const section = dom.bookmarksSection();
    section.classList.toggle('is-open');
  });

  // Copy
  dom.btnCopy().addEventListener('click', () => copyBookmarks());

  // Clear bookmarks
  dom.btnClearBookmarks().addEventListener('click', () => clearBookmarks());
}

// ===================================================================
// INIT
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initEvents();

  // Initial state
  dom.cardScene().style.display = 'none';
  document.getElementById('nav-row').style.display = 'none';
  document.getElementById('btn-restart').style.display = 'none';
  dom.timerOptions().style.display = 'none';
  dom.counterTotal().textContent = CARDS.length;
  dom.counterNumber().textContent = '0';

  // Set timer ring circumference
  const fill = dom.timerFill();
  if (fill) {
    fill.style.strokeDasharray = TIMER_CIRCUMFERENCE;
    fill.style.strokeDashoffset = 0;
  }

  updateBookmarksPanel();
});

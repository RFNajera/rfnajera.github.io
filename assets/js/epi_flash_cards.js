/* ===================================================================
   EPI FLASHCARDS — epi_flash_cards.js
   Card data + game logic
   -------------------------------------------------------------------
   Cards are organized into three difficulty categories:
     - "public":   General-public terms (no specialized science needed)
     - "student":  Undergraduate / graduate level (basic science foundation)
     - "advanced": Doctoral / advanced clinical & field epidemiology
   -------------------------------------------------------------------
   All terms have been reviewed against:
     - Gordis, L. Epidemiology, 5th ed. (Elsevier, 2014)
     - Bonita R., Beaglehole R., Kjellström T. Basic Epidemiology, 2nd ed.
       (WHO, 2006)
     - Van den Broeck J., Brestoff J.R. Epidemiology: Principles &
       Practical Guidelines (Springer, 2013)
     - Understanding Epidemiology (Jones & Bartlett)
     - CDC Principles of Epidemiology in Public Health Practice, 3rd ed.
       (2012)
   =================================================================== */

// ===================================================================
// CARD DATA
// ===================================================================
const CARDS = [

  // ==================================================================
  // CATEGORY: PUBLIC
  // Terms a general audience can understand without specialized science.
  // ==================================================================

  { cat: "public", q: "What is epidemiology?", a: "Epidemiology is the study of the distribution and determinants of health-related states or events in specified populations, and the application of this study to the prevention and control of health problems.", ref: "Source: Bonita, Beaglehole & Kjellström, Basic Epidemiology, 2nd ed. (WHO 2006); CDC Principles of Epidemiology, 3rd ed.", term: "epidemiology" },

  { cat: "public", q: "What does an epidemiologist do?", a: "An epidemiologist studies who gets sick, where, and why — and uses that information to prevent disease and protect the health of populations.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 1", term: "what is an epidemiologist" },

  { cat: "public", q: "What is an epidemic?", a: "An epidemic is the occurrence of cases of an illness in a community or region clearly in excess of what is normally expected for that area and population.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 1", term: "epidemic definition" },

  { cat: "public", q: "What is a pandemic?", a: "A pandemic is an epidemic that has spread across several countries or continents, usually affecting large numbers of people.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 1", term: "pandemic definition" },

  { cat: "public", q: "What is an endemic disease?", a: "An endemic disease is one that is constantly present in a particular region or population at a usual or expected level — for example, chickenpox in many parts of the world before widespread vaccination.", ref: "Source: CDC Principles of Epidemiology, 3rd ed.", term: "endemic disease" },

  { cat: "public", q: "What is an outbreak?", a: "An outbreak is the same idea as an epidemic but usually refers to a more limited geographic area or smaller group of people. The two words are often used interchangeably.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 1", term: "outbreak definition" },

  { cat: "public", q: "What is herd immunity?", a: "Herd immunity is the indirect protection from an infectious disease that happens when a large enough share of a community is immune (through vaccination or prior infection) that the germ has difficulty finding new people to infect.", ref: "Source: WHO; CDC Principles of Epidemiology, 3rd ed.", term: "herd immunity" },

  { cat: "public", q: "What is a vaccine?", a: "A vaccine is a biological preparation that trains the immune system to recognize and fight a specific disease-causing organism without making the person sick from the disease itself.", ref: "Source: WHO Immunization Basics", term: "vaccine" },

  { cat: "public", q: "What is the difference between an outbreak and a pandemic?", a: "An outbreak is a rise in cases in a limited area or group; an epidemic is a larger rise within a community or region; a pandemic is an epidemic that has spread across many countries or continents.", ref: "Source: CDC Principles of Epidemiology, 3rd ed.", term: "outbreak vs epidemic vs pandemic" },

  { cat: "public", q: "What is a case?", a: "In epidemiology, a case is a person identified as having a particular disease, health disorder, or condition under investigation.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 1", term: "case in epidemiology" },

  { cat: "public", q: "What is an outbreak investigation?", a: "An outbreak investigation is the organized search for the source of an unusual rise in disease, so it can be stopped and prevented in the future. It usually involves interviewing patients, gathering lab samples, and looking for shared exposures.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 6", term: "outbreak investigation" },

  { cat: "public", q: "What is a contact in disease investigation?", a: "A contact is a person who has been close enough to an infected individual to have been exposed to the infection — for example, household members, classmates, or co-workers.", ref: "Source: CDC Principles of Epidemiology, 3rd ed.", term: "contact tracing" },

  { cat: "public", q: "What is contact tracing?", a: "Contact tracing is the public-health process of identifying people who may have been exposed to an infectious disease, notifying them, and helping them quarantine, get tested, or seek care to stop further spread.", ref: "Source: CDC; WHO", term: "contact tracing definition" },

  { cat: "public", q: "What is the incubation period?", a: "The incubation period is the time between when a person is exposed to an infection and when they start showing symptoms. It is different for every disease — a few hours for some food poisonings, several days for flu, years for HIV.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 1", term: "incubation period" },

  { cat: "public", q: "What is quarantine?", a: "Quarantine is the separation and restriction of movement of people who were exposed to a contagious disease but are not yet sick, to see if they become ill. Isolation, by contrast, applies to people who are already known to be sick.", ref: "Source: CDC", term: "quarantine vs isolation" },

  { cat: "public", q: "What is the difference between quarantine and isolation?", a: "Isolation keeps someone who is already sick away from others. Quarantine separates and restricts the movement of people who were exposed but are not yet known to be sick, in case they become contagious.", ref: "Source: CDC", term: "quarantine vs isolation" },

  { cat: "public", q: "What is a zoonotic disease?", a: "A zoonotic disease (or zoonosis) is an illness caused by a germ that spreads between animals and people — examples include rabies, Lyme disease, and many influenzas.", ref: "Source: CDC One Health; WHO", term: "zoonotic disease" },

  { cat: "public", q: "What is public health surveillance?", a: "Public health surveillance is the ongoing collection, analysis, and sharing of health data so that public health officials can detect problems early and respond. Examples include weekly flu reports and notifiable disease tracking.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 5", term: "public health surveillance" },

  { cat: "public", q: "What is prevention in public health?", a: "Prevention is any action that stops a disease from happening in the first place, finds it early when treatment works best, or reduces complications once it occurs. These three approaches are called primary, secondary, and tertiary prevention.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 18", term: "prevention public health" },

  { cat: "public", q: "What is primary prevention?", a: "Primary prevention stops disease before it starts — for example, vaccination, seat-belt laws, clean drinking water, or campaigns to encourage exercise and healthy eating.", ref: "Source: Gordis, Epidemiology 5th ed.", term: "primary prevention" },

  { cat: "public", q: "What is secondary prevention?", a: "Secondary prevention is early detection and treatment of a disease before it causes major harm — for example, mammograms, blood-pressure checks, or screening newborns for hearing loss.", ref: "Source: Gordis, Epidemiology 5th ed.", term: "secondary prevention" },

  { cat: "public", q: "What is tertiary prevention?", a: "Tertiary prevention reduces the impact of an existing disease — for example, rehabilitation after a stroke, diabetes management to prevent complications, or support groups to improve quality of life.", ref: "Source: Gordis, Epidemiology 5th ed.", term: "tertiary prevention" },

  { cat: "public", q: "What are risk factors?", a: "A risk factor is anything — a behavior, exposure, or characteristic — that raises the chance a person will develop a disease. Smoking is a risk factor for lung cancer; high blood pressure is a risk factor for stroke.", ref: "Source: CDC", term: "risk factor" },

  { cat: "public", q: "What is a chronic disease?", a: "A chronic disease is one that lasts a long time — generally a year or more — and usually needs ongoing medical attention. Examples include heart disease, diabetes, and most cancers.", ref: "Source: CDC", term: "chronic disease" },

  { cat: "public", q: "What is an infectious disease?", a: "An infectious disease is an illness caused by a germ — a bacterium, virus, parasite, or fungus — that can be passed, directly or indirectly, from one person, animal, or source to another.", ref: "Source: CDC; WHO", term: "infectious disease" },

  { cat: "public", q: "What are the social determinants of health?", a: "The social determinants of health are the conditions in which people are born, grow, live, work, and age — including income, education, housing, neighborhood safety, and access to care — that shape how healthy a person can be.", ref: "Source: WHO Commission on Social Determinants of Health (2008)", term: "social determinants of health" },

  { cat: "public", q: "What is health equity?", a: "Health equity means everyone has a fair and just opportunity to be as healthy as possible. It requires removing obstacles — such as poverty, discrimination, and lack of access — that prevent some groups from reaching good health.", ref: "Source: CDC Health Equity; Robert Wood Johnson Foundation", term: "health equity" },

  { cat: "public", q: "What is a health disparity?", a: "A health disparity is a preventable difference in disease, injury, or opportunities to be healthy that is experienced more heavily by socially disadvantaged groups.", ref: "Source: CDC Health Equity", term: "health disparity" },

  { cat: "public", q: "What is screening?", a: "Screening is testing people who feel well to find diseases early, when they are easier to treat. Mammograms, colonoscopies, and newborn blood tests are all examples of screening.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 5", term: "screening definition" },

  { cat: "public", q: "What is mortality?", a: "Mortality means death. A mortality rate is the number of deaths in a population over a given period, usually expressed per 1,000 or 100,000 people per year.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 3", term: "mortality" },

  { cat: "public", q: "What is morbidity?", a: "Morbidity refers to illness or disease in a population — how many people are sick. It is distinct from mortality, which refers to death.", ref: "Source: CDC Principles of Epidemiology, 3rd ed.", term: "morbidity" },

  { cat: "public", q: "What is life expectancy?", a: "Life expectancy is the average number of years a person can expect to live, based on the death rates in their country or population at the time of their birth.", ref: "Source: WHO; CDC", term: "life expectancy" },

  { cat: "public", q: "What is a notifiable (reportable) disease?", a: "A notifiable disease is one that doctors and laboratories are required by law to report to public health authorities — for example, measles, tuberculosis, and many sexually transmitted infections — so outbreaks can be tracked and stopped.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 5", term: "notifiable disease" },

  { cat: "public", q: "What is One Health?", a: "One Health is an approach that recognizes the health of people, animals, and the shared environment are connected. It is used to tackle problems like zoonotic disease, food safety, and antimicrobial resistance.", ref: "Source: CDC One Health", term: "One Health" },

  { cat: "public", q: "What is a host in disease transmission?", a: "A host is a person or animal in which an infectious agent can live and multiply. People can be hosts for the flu virus; deer and mice are hosts for the bacteria that cause Lyme disease.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 1", term: "host disease" },

  { cat: "public", q: "What is the chain of infection?", a: "The chain of infection is the sequence of events needed for an infection to spread: an infectious agent, a reservoir, a way out of the reservoir, a mode of transmission, a way into a new host, and a susceptible host. Breaking any link stops the spread.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 1", term: "chain of infection" },


  // ==================================================================
  // CATEGORY: STUDENT
  // Undergraduate / graduate level — assumes basic science literacy.
  // ==================================================================

  { cat: "student", q: "What are the three components of the epidemiologic triad?", a: "The epidemiologic triad models infectious disease causation as an interaction of three elements: the agent (the pathogen), the host (the person at risk), and the environment (the conditions that bring agent and host together).", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 1", term: "epidemiologic triad" },

  { cat: "student", q: "What is the natural history of disease?", a: "The natural history of disease describes the progression of a disease in an individual from the moment of exposure through the stages of subclinical disease, clinical disease, and resolution (recovery, disability, or death) in the absence of treatment.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 1", term: "natural history of disease" },

  { cat: "student", q: "What is the difference between incidence and prevalence?", a: "Incidence measures new cases of disease that develop in a defined population during a defined period. Prevalence measures the total cases — new and pre-existing — present in a population at a point in time.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 3", term: "incidence vs prevalence" },

  { cat: "student", q: "What is the relationship between incidence, prevalence, and disease duration?", a: "When incidence and duration are stable, prevalence ≈ incidence × average duration of disease. Prevalence rises when people live longer with the disease, even if the rate of new cases stays the same.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 3", term: "prevalence incidence duration" },

  { cat: "student", q: "What is a cohort study?", a: "A cohort study is an observational study in which people are classified by exposure status and followed over time to compare the incidence (or rate) of disease in the exposed and unexposed groups.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 9", term: "cohort study" },

  { cat: "student", q: "What is a case-control study?", a: "A case-control study compares people with a disease (cases) to people without it (controls) and looks backward to compare past exposures, in order to identify factors associated with the disease.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 10", term: "case-control study" },

  { cat: "student", q: "What is a cross-sectional study?", a: "A cross-sectional study measures exposure and outcome simultaneously in a defined population — providing a snapshot of disease prevalence and associated factors at one point in time.", ref: "Source: Van den Broeck & Brestoff, Epidemiology: Principles & Practical Guidelines (Springer 2013), Ch. 8", term: "cross-sectional study" },

  { cat: "student", q: "What is a randomized controlled trial (RCT)?", a: "An RCT is an experimental study in which participants are randomly allocated to an intervention or a comparison (control) group and followed to compare outcomes — minimizing confounding and selection bias.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 7", term: "randomized controlled trial" },

  { cat: "student", q: "What is descriptive epidemiology?", a: "Descriptive epidemiology characterizes the occurrence of disease by person (who), place (where), and time (when). It generates hypotheses about causes that analytic studies can then test.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 1", term: "descriptive epidemiology" },

  { cat: "student", q: "What is analytic epidemiology?", a: "Analytic epidemiology tests hypotheses about exposure–disease relationships, usually with a comparison group, to quantify associations and assess causality. Cohort, case-control, and randomized trials are the main analytic designs.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 1", term: "analytic epidemiology" },

  { cat: "student", q: "What is a risk ratio (relative risk)?", a: "A risk ratio is the ratio of disease risk (cumulative incidence) in an exposed group to the risk in an unexposed group. A risk ratio of 1.0 means no difference; values above 1 suggest harm, values below 1 suggest protection.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 11", term: "risk ratio relative risk" },

  { cat: "student", q: "What is an odds ratio?", a: "An odds ratio is the ratio of the odds of exposure among cases to the odds of exposure among controls. It is the standard measure of association in case-control studies and approximates the risk ratio when disease is rare.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 12", term: "odds ratio" },

  { cat: "student", q: "What is attributable risk?", a: "Attributable risk (risk difference) is the difference in disease incidence between exposed and unexposed groups. It estimates the excess disease burden in the exposed group that can be attributed to the exposure, assuming the relationship is causal.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 12", term: "attributable risk" },

  { cat: "student", q: "What is the attack rate?", a: "The attack rate is the proportion of an at-risk population that develops disease during an outbreak (cases ÷ at-risk population). It is a cumulative incidence calculated over the epidemic period rather than per year.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 3", term: "attack rate" },

  { cat: "student", q: "What is the secondary attack rate?", a: "The secondary attack rate measures spread within a defined group, usually a household: it is the attack rate among susceptible contacts of a primary case. It quantifies person-to-person transmissibility.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 2", term: "secondary attack rate" },

  { cat: "student", q: "What is the basic reproduction number, R₀?", a: "R₀ (R-naught) is the average number of secondary infections produced by one infectious person in a fully susceptible population. R₀ > 1 means the disease can spread; R₀ < 1 means it will die out.", ref: "Source: Understanding Epidemiology (Jones & Bartlett); CDC", term: "basic reproduction number R0" },

  { cat: "student", q: "What is the difference between R₀ and the effective reproduction number (Rₑ or Rₜ)?", a: "R₀ assumes a fully susceptible population. The effective reproduction number (Rₑ or Rₜ) accounts for immunity, behavior change, and interventions present at a given time. Rₜ < 1 means transmission is contracting.", ref: "Source: WHO; Understanding Epidemiology", term: "effective reproduction number Rt" },

  { cat: "student", q: "What is a case definition?", a: "A case definition is a standard set of criteria for deciding whether a person should be classified as having the disease under study. It may include clinical, laboratory, and epidemiologic criteria and is often stratified as confirmed, probable, or suspected.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 6", term: "case definition" },

  { cat: "student", q: "What are the steps of an outbreak investigation?", a: "CDC describes 10 steps: (1) prepare for fieldwork; (2) establish the existence of an outbreak; (3) verify the diagnosis; (4) construct a working case definition; (5) find cases systematically; (6) perform descriptive epidemiology; (7) develop hypotheses; (8) evaluate hypotheses with analytic methods; (9) reconsider or refine; (10) implement control and prevention; communicate findings.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 6", term: "outbreak investigation steps" },

  { cat: "student", q: "What is a point-source outbreak?", a: "A point-source outbreak occurs when a group of people is exposed to the same source over a relatively brief time. The epidemic curve typically shows a single, sharp peak whose width reflects the incubation period.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 6", term: "point source outbreak" },

  { cat: "student", q: "What is a propagated outbreak?", a: "A propagated outbreak spreads from person to person rather than from a single common source. Its epidemic curve usually shows a series of progressively taller peaks, each one incubation period apart.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 6", term: "propagated outbreak" },

  { cat: "student", q: "What is an epidemic curve?", a: "An epidemic curve (epi curve) is a histogram of case counts by date or time of illness onset. Its shape, height, and spread help investigators identify the pattern of spread, probable time of exposure, and outliers.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 6", term: "epidemic curve" },

  { cat: "student", q: "What is the iceberg phenomenon of disease?", a: "The iceberg phenomenon (or iceberg concept) describes that for every clinically diagnosed case, there are typically many milder, subclinical, or asymptomatic infections that go undetected — the visible 'tip' is only part of the burden.", ref: "Source: Bonita, Beaglehole & Kjellström, Basic Epidemiology, 2nd ed. (WHO)", term: "iceberg phenomenon disease" },

  { cat: "student", q: "What is a confounding variable?", a: "A confounder is a third variable that is (1) associated with the exposure, (2) an independent risk factor for the outcome, and (3) not on the causal pathway between exposure and outcome. Unadjusted confounders distort observed associations.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 15", term: "confounding variable" },

  { cat: "student", q: "What is selection bias?", a: "Selection bias is a systematic error arising from procedures used to choose study participants — for example, recruiting cases from one hospital and controls from a different population. It distorts the measured association.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 15", term: "selection bias" },

  { cat: "student", q: "What is information (measurement) bias?", a: "Information bias is a systematic error from inaccurate measurement or classification of exposure, outcome, or covariates. Examples include recall bias and interviewer bias.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 15", term: "information bias" },

  { cat: "student", q: "What is recall bias?", a: "Recall bias is a type of information bias in which cases and controls remember past exposures with different accuracy. Cases, motivated to find a cause, often recall exposures more thoroughly than healthy controls.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 10", term: "recall bias" },

  { cat: "student", q: "What is sensitivity?", a: "Sensitivity is the probability that a test correctly identifies people who truly have the disease — true positives ÷ (true positives + false negatives). A highly sensitive test minimizes false negatives.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 5", term: "sensitivity test" },

  { cat: "student", q: "What is specificity?", a: "Specificity is the probability that a test correctly identifies people who truly do not have the disease — true negatives ÷ (true negatives + false positives). A highly specific test minimizes false positives.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 5", term: "specificity test" },

  { cat: "student", q: "What is positive predictive value (PPV)?", a: "PPV is the probability that a person with a positive test truly has the disease (true positives ÷ all positives). Unlike sensitivity, PPV depends on disease prevalence — lower prevalence yields a lower PPV.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 5", term: "positive predictive value" },

  { cat: "student", q: "What is negative predictive value (NPV)?", a: "NPV is the probability that a person with a negative test truly does not have the disease (true negatives ÷ all negatives). NPV also depends on prevalence — higher prevalence yields lower NPV.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 5", term: "negative predictive value" },

  { cat: "student", q: "What is a p-value?", a: "A p-value is the probability of observing data at least as extreme as what was observed, assuming the null hypothesis is true. A small p-value provides evidence against the null but does not measure the size or importance of an effect.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 11; ASA Statement on p-values (2016)", term: "p-value" },

  { cat: "student", q: "What is a confidence interval?", a: "A confidence interval is a range of values, calculated from the data, that is intended to contain the true population parameter a specified percentage of the time (commonly 95%) over many repeated samples. Narrower intervals indicate greater precision.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 11", term: "confidence interval" },

  { cat: "student", q: "What is the null hypothesis?", a: "The null hypothesis (H₀) is the default statement of no association or no difference between groups. Statistical tests evaluate the data against H₀; a small p-value provides evidence to reject H₀.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 11", term: "null hypothesis" },

  { cat: "student", q: "What is statistical power?", a: "Statistical power is the probability that a study will detect an effect of a given size, if one truly exists. Power equals 1 − β, where β is the Type II error rate. Power is increased by larger samples and larger effect sizes.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 11", term: "statistical power" },

  { cat: "student", q: "What is the difference between a Type I and Type II error?", a: "A Type I error (α) is rejecting a true null hypothesis — a false positive. A Type II error (β) is failing to reject a false null hypothesis — a false negative. Power = 1 − β.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 11", term: "Type I and Type II error" },

  { cat: "student", q: "What is blinding (masking) in a clinical trial?", a: "Blinding hides treatment assignment from participants (single-blind), from participants and investigators (double-blind), or from participants, investigators, and outcome assessors (triple-blind). It reduces information bias and placebo effects.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 7", term: "blinding clinical trial" },

  { cat: "student", q: "What is randomization?", a: "Randomization is the random allocation of participants to treatment groups in a clinical trial. It balances both measured and unmeasured confounders across groups, making the groups comparable on average.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 7", term: "randomization" },

  { cat: "student", q: "What is a control group?", a: "A control group is a comparison group that does not receive the intervention or exposure under study. It establishes the baseline against which the effect of the exposure or treatment is judged.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 7", term: "control group" },

  { cat: "student", q: "What is matching in a case-control study?", a: "Matching pairs each case with one or more controls sharing the same value of a potential confounder (e.g., age, sex). It controls confounding by design but requires matched analysis to avoid bias.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 10", term: "matching case-control" },

  { cat: "student", q: "What is active surveillance?", a: "Active surveillance is when health authorities reach out — by phone calls, visits, or chart reviews — to collect data on cases. It is more complete and timely than passive surveillance but more resource-intensive.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 5", term: "active surveillance" },

  { cat: "student", q: "What is passive surveillance?", a: "Passive surveillance relies on routine reports submitted to health authorities by physicians, hospitals, and laboratories. It is inexpensive and broad-reaching but typically underreports the true number of cases.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 5", term: "passive surveillance" },

  { cat: "student", q: "What is sentinel surveillance?", a: "Sentinel surveillance uses a selected sample of reporting sites (e.g., clinics, providers) that are chosen to represent a wider population. It gives high-quality data efficiently when full enumeration is impractical, as with seasonal influenza.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 5", term: "sentinel surveillance" },

  { cat: "student", q: "What is the case-fatality rate (CFR)?", a: "The case-fatality rate is the proportion of diagnosed cases of a disease who die from it (deaths ÷ cases × 100), measured over a defined period. It reflects the severity of the disease, not its frequency.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 3", term: "case-fatality rate" },

  { cat: "student", q: "What is the difference between mortality rate and case-fatality rate?", a: "A mortality rate is deaths from a disease divided by the total population at risk over time. A case-fatality rate is deaths from a disease divided only by people diagnosed with that disease — it measures lethality, not population burden.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 3", term: "mortality vs case-fatality rate" },

  { cat: "student", q: "What is vaccine efficacy?", a: "Vaccine efficacy is the relative reduction in disease risk among vaccinated people compared with unvaccinated people, measured under the controlled conditions of a randomized clinical trial.", ref: "Source: CDC Principles of Epidemiology, 3rd ed.; WHO", term: "vaccine efficacy" },

  { cat: "student", q: "What is vaccine effectiveness?", a: "Vaccine effectiveness is the reduction in disease in a vaccinated population observed in real-world (post-licensure) use, usually estimated from observational study designs such as test-negative case-control studies.", ref: "Source: CDC Principles of Epidemiology, 3rd ed.; WHO", term: "vaccine effectiveness" },

  { cat: "student", q: "What is a retrospective vs. prospective study design?", a: "In a prospective study, exposure is measured at baseline and participants are followed forward in time for the outcome. In a retrospective study, both exposure and outcome have already occurred when the study begins, and existing records are reviewed.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 9", term: "retrospective vs prospective" },

  { cat: "student", q: "What is an ecological study?", a: "An ecological study analyzes data at the population (group) level — for example, comparing average sodium intake and stroke rates across countries — rather than at the individual level. Conclusions about individuals from such data risk the ecological fallacy.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 6", term: "ecological study" },

  { cat: "student", q: "What is the ecological fallacy?", a: "The ecological fallacy is the error of drawing conclusions about individual-level relationships from data observed only at the group level. A correlation between two variables among populations does not necessarily hold among individuals within those populations.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 6", term: "ecological fallacy" },

  { cat: "student", q: "What is internal validity?", a: "Internal validity is the degree to which a study's findings reflect the true relationship between exposure and outcome in the study population — that is, freedom from bias, confounding, and chance.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 15", term: "internal validity" },

  { cat: "student", q: "What is external validity (generalizability)?", a: "External validity is the extent to which study results apply to populations outside the study sample. A study can have strong internal validity but limited external validity if its participants are unusual or its setting is unique.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 15", term: "external validity" },


  // ==================================================================
  // CATEGORY: ADVANCED
  // Doctoral / advanced clinical and field epidemiology.
  // ==================================================================

  { cat: "advanced", q: "What are the Bradford Hill viewpoints on causation?", a: "Sir Austin Bradford Hill (1965) proposed nine viewpoints for judging whether an observed association is causal: strength, consistency, specificity, temporality, biological gradient (dose-response), plausibility, coherence, experiment, and analogy. They are aids to judgment, not a checklist.", ref: "Source: Hill AB. The Environment and Disease: Association or Causation? Proc R Soc Med. 1965;58:295-300", term: "Bradford Hill criteria" },

  { cat: "advanced", q: "Which Bradford Hill viewpoint is considered indispensable?", a: "Temporality — the cause must precede the effect — is the only viewpoint that is logically necessary. The remaining viewpoints are supportive but not individually required or sufficient for causal inference.", ref: "Source: Hill AB, Proc R Soc Med 1965; Rothman & Greenland, Modern Epidemiology", term: "temporality Hill" },

  { cat: "advanced", q: "What is the Rothman sufficient-component cause model?", a: "Rothman's model represents each sufficient cause as a 'pie' composed of multiple component causes. A sufficient cause inevitably produces disease when all of its components are present; a necessary cause appears in every sufficient cause for that disease.", ref: "Source: Rothman KJ. Causes. Am J Epidemiol 1976;104:587-92; Gordis 5th ed., Ch. 14", term: "sufficient component cause Rothman" },

  { cat: "advanced", q: "What is the difference between a sufficient cause and a necessary cause?", a: "A sufficient cause is one whose presence guarantees the disease will occur. A necessary cause must be present for the disease to occur but may not be sufficient on its own — Mycobacterium tuberculosis, for instance, is necessary for TB but not sufficient.", ref: "Source: Rothman, Greenland & Lash, Modern Epidemiology, 3rd ed.; Gordis 5th ed., Ch. 14", term: "necessary vs sufficient cause" },

  { cat: "advanced", q: "What is the counterfactual definition of causation?", a: "In the counterfactual framework, an exposure is a cause of an outcome in an individual if the outcome would not have occurred (or would have occurred differently) had the exposure been absent — comparing factual and counterfactual potential outcomes.", ref: "Source: Hernán & Robins, Causal Inference: What If (CRC Press, 2020); Rothman et al., Modern Epidemiology", term: "counterfactual causal inference" },

  { cat: "advanced", q: "What is person-time and when is it used?", a: "Person-time sums the time each subject contributes to the population at risk. It is the denominator for incidence rates (also called incidence density) when follow-up time varies between subjects — common in dynamic cohorts.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 3", term: "person-time" },

  { cat: "advanced", q: "What is the difference between cumulative incidence and incidence rate (incidence density)?", a: "Cumulative incidence (incidence proportion) is new cases ÷ population at risk at the start of follow-up — a probability with no time unit attached to the denominator. Incidence rate is new cases ÷ person-time at risk — a rate with units of 1/time that accommodates variable follow-up and competing risks.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 3; Rothman et al., Modern Epidemiology", term: "cumulative incidence vs incidence rate" },

  { cat: "advanced", q: "What is the population attributable risk percent (PAR%)?", a: "PAR% estimates the proportion of disease in the total population that would be eliminated if the exposure were removed: PAR% = [(Iₜ − Iᵤ) / Iₜ] × 100, where Iₜ is incidence in the total population and Iᵤ is incidence in the unexposed. It incorporates both the strength of the association and the prevalence of the exposure.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 12; CDC Principles of Epidemiology, Lesson 3", term: "population attributable risk percent" },

  { cat: "advanced", q: "What is the herd immunity threshold and how is it calculated?", a: "The herd immunity threshold (Hₜ) is the minimum proportion of an evenly mixing population that must be immune to interrupt sustained transmission. For a homogeneous population, Hₜ = 1 − 1/R₀. Real populations require higher coverage because mixing is heterogeneous and immunity wanes.", ref: "Source: Anderson & May, Infectious Diseases of Humans (Oxford, 1991); CDC", term: "herd immunity threshold" },

  { cat: "advanced", q: "What is a nested case-control study?", a: "A nested case-control study selects all incident cases that arise within a defined cohort and a sample of non-cases from the same cohort for detailed (and often costly) analyses. It preserves the temporal clarity of a cohort while improving efficiency.", ref: "Source: Rothman, Greenland & Lash, Modern Epidemiology, 3rd ed.; Gordis Ch. 10", term: "nested case-control study" },

  { cat: "advanced", q: "What is a case-cohort study?", a: "A case-cohort study compares all incident cases in a cohort to a random sub-cohort selected at baseline. Unlike nested case-control sampling, the sub-cohort is fixed from the start and can serve as the comparison group for multiple outcomes.", ref: "Source: Prentice RL. Biometrika 1986;73:1-11; Rothman et al., Modern Epidemiology", term: "case-cohort study" },

  { cat: "advanced", q: "What is a cluster-randomized trial?", a: "A cluster-randomized trial randomizes intact groups (clinics, schools, villages) rather than individuals to intervention or control conditions. It is used when individual randomization is impractical or when the intervention naturally acts at the group level. Analysis must account for intra-cluster correlation.", ref: "Source: Hayes & Moulton, Cluster Randomised Trials, 2nd ed. (CRC Press, 2017)", term: "cluster randomized trial" },

  { cat: "advanced", q: "What is the Mantel-Haenszel method?", a: "The Mantel-Haenszel method produces a pooled, confounder-adjusted estimate of the odds ratio, risk ratio, or rate ratio by combining stratum-specific estimates with appropriate weights. It is robust to sparse data and underlies most stratified analyses.", ref: "Source: Mantel N, Haenszel W. JNCI 1959;22:719-48; Rothman et al., Modern Epidemiology", term: "Mantel-Haenszel method" },

  { cat: "advanced", q: "What is the Kaplan-Meier estimator?", a: "The Kaplan-Meier estimator is a non-parametric method for estimating the survivor function from time-to-event data, accounting for right-censoring by computing conditional survival probabilities at each event time and multiplying them across the follow-up period.", ref: "Source: Kaplan EL, Meier P. JASA 1958;53:457-81; Gordis Ch. 6", term: "Kaplan-Meier estimator" },

  { cat: "advanced", q: "What is a hazard ratio?", a: "A hazard ratio is the ratio of instantaneous event rates (hazards) between two groups at any given time. It is the standard effect estimate from Cox proportional hazards regression and assumes (in its simplest form) that the ratio is constant over follow-up.", ref: "Source: Cox DR. JRSS-B 1972;34:187-220; Gordis Ch. 6", term: "hazard ratio" },

  { cat: "advanced", q: "What is the proportional hazards assumption?", a: "The proportional hazards assumption holds that the hazard ratio between two groups is constant over the entire follow-up period. Violations can be detected with Schoenfeld residuals or a log(–log(survival)) plot, and are addressed with stratification or time-varying covariates.", ref: "Source: Cox DR, JRSS-B 1972; Klein & Moeschberger, Survival Analysis (Springer 2003)", term: "proportional hazards assumption" },

  { cat: "advanced", q: "What is differential vs. non-differential misclassification?", a: "Non-differential misclassification is independent of disease status (or vice versa) and typically biases dichotomous-exposure estimates toward the null. Differential misclassification differs across comparison groups and can bias estimates in either direction, sometimes dramatically.", ref: "Source: Rothman, Greenland & Lash, Modern Epidemiology, 3rd ed.; Gordis Ch. 15", term: "differential vs non-differential misclassification" },

  { cat: "advanced", q: "What is Berkson's bias?", a: "Berkson's bias (or admission-rate bias) arises in hospital-based case-control studies when the probability of being hospitalized for the disease and for the exposure differ, creating a spurious association between exposure and disease among hospitalized people that does not exist in the general population.", ref: "Source: Berkson J. Biometrics 1946;2:47-53; Rothman et al., Modern Epidemiology", term: "Berkson bias" },

  { cat: "advanced", q: "What is the healthy worker effect?", a: "The healthy worker effect is a form of selection bias in occupational studies: employed populations exhibit lower mortality than the general population because severely ill or disabled individuals are less likely to be employed. It typically biases occupational risk estimates toward the null.", ref: "Source: McMichael AJ. J Occup Med 1976;18:165-8; Rothman et al., Modern Epidemiology", term: "healthy worker effect" },

  { cat: "advanced", q: "What is collider (selection-related) bias?", a: "Collider bias is a spurious association induced when an analysis conditions on (stratifies, restricts, or adjusts for) a variable that is a common effect of the exposure and the outcome. It is a key threat in cohort selection, case-control sampling, and missing-data analyses.", ref: "Source: Hernán MA, Hernández-Díaz S, Robins JM. Epidemiology 2004;15:615-25", term: "collider bias" },

  { cat: "advanced", q: "What is a directed acyclic graph (DAG)?", a: "A DAG is a graphical model whose nodes represent variables and whose directed edges represent assumed causal effects, without cycles. DAGs encode assumptions about confounding, mediation, and selection, and identify the minimum sufficient adjustment set using the back-door criterion.", ref: "Source: Greenland S, Pearl J, Robins JM. Epidemiology 1999;10:37-48", term: "directed acyclic graph DAG" },

  { cat: "advanced", q: "What is effect modification (interaction)?", a: "Effect modification occurs when the magnitude of an exposure's effect on the outcome differs across levels of another variable. Unlike confounding, effect modification is a substantive finding to be reported (often as stratum-specific estimates), not eliminated. Additive and multiplicative interactions may give different answers.", ref: "Source: Rothman, Greenland & Lash, Modern Epidemiology, 3rd ed.", term: "effect modification interaction" },

  { cat: "advanced", q: "How is confounding distinguished from effect modification analytically?", a: "Confounding is a distortion to be removed: stratum-specific estimates are similar, but differ from the crude. Effect modification is a substantive heterogeneity: stratum-specific estimates differ from each other and a single summary measure may be misleading.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 15; Rothman et al., Modern Epidemiology", term: "confounding vs effect modification" },

  { cat: "advanced", q: "What is propensity score analysis?", a: "A propensity score is the predicted probability of exposure given measured covariates. Matching, stratifying, weighting (e.g., IPTW), or covariate-adjusting on the score can balance covariates across exposure groups in observational studies, mimicking randomization for measured confounders.", ref: "Source: Rosenbaum PR, Rubin DB. Biometrika 1983;70:41-55", term: "propensity score" },

  { cat: "advanced", q: "What is instrumental variable (IV) analysis?", a: "An instrumental variable affects the outcome only through its effect on the exposure, is associated with the exposure, and is independent of unmeasured confounders. Under these assumptions, IV methods (e.g., two-stage least squares, Mendelian randomization) estimate causal effects despite unmeasured confounding.", ref: "Source: Greenland S. Int J Epidemiol 2000;29:722-9", term: "instrumental variable" },

  { cat: "advanced", q: "What is Mendelian randomization?", a: "Mendelian randomization uses genetic variants as instrumental variables for a modifiable exposure. Because alleles are randomly assorted at meiosis, they are typically unrelated to behavioral or environmental confounders, allowing causal inference about the exposure on the outcome.", ref: "Source: Smith GD, Ebrahim S. Int J Epidemiol 2003;32:1-22", term: "Mendelian randomization" },

  { cat: "advanced", q: "What is the difference between intention-to-treat (ITT) and per-protocol analysis?", a: "ITT analyzes participants in the groups to which they were randomized regardless of adherence — preserving randomization, estimating effectiveness, and conservatively biased toward the null. Per-protocol analyzes only adherent participants — estimating biological efficacy but vulnerable to selection bias.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 7; ICH E9 Statistical Principles", term: "intention-to-treat per-protocol" },

  { cat: "advanced", q: "What is overdiagnosis bias in screening?", a: "Overdiagnosis is the detection through screening of disease that would never have caused symptoms or death during the patient's lifetime. It inflates apparent incidence and survival while exposing patients to the harms of unnecessary diagnosis and treatment.", ref: "Source: Welch HG, Black WC. JNCI 2010;102:605-13; Gordis Ch. 18", term: "overdiagnosis screening" },

  { cat: "advanced", q: "What is lead-time bias?", a: "Lead-time bias is the apparent survival benefit from screening that arises purely from advancing the time of diagnosis without changing the time of death. Without accounting for lead time, screened patients appear to live longer when they are merely diagnosed earlier.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 18", term: "lead-time bias" },

  { cat: "advanced", q: "What is length-biased sampling in screening?", a: "Length-biased sampling reflects that slowly progressing cases have a longer detectable preclinical phase and are therefore over-represented in screening-detected cohorts, while aggressive fast-growing cases are under-represented. This systematically inflates the apparent prognosis of screen-detected disease.", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 18; Welch HG", term: "length-biased sampling" },

  { cat: "advanced", q: "What is the number needed to treat (NNT)?", a: "NNT = 1 / absolute risk reduction. It estimates how many patients must receive an intervention, instead of the comparator, for one additional patient to benefit. NNT contextualizes a relative risk reduction in absolute terms for clinical decisions.", ref: "Source: Laupacis A, Sackett DL, Roberts RS. NEJM 1988;318:1728-33", term: "number needed to treat NNT" },

  { cat: "advanced", q: "What is direct vs. indirect age standardization?", a: "Direct standardization applies the study population's age-specific rates to a chosen standard population, producing comparable summary rates. Indirect standardization applies a standard set of age-specific rates to the study population to compute expected events, yielding a standardized mortality (or morbidity) ratio (SMR).", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 3; Gordis Ch. 4", term: "direct vs indirect standardization" },

  { cat: "advanced", q: "What is a standardized mortality ratio (SMR)?", a: "An SMR is the ratio of observed deaths in a study population to deaths expected if it had the age-specific mortality of a standard population. SMR = 1.0 indicates equivalence; >1.0 indicates excess mortality. It is the principal output of indirect standardization.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 3", term: "standardized mortality ratio" },

  { cat: "advanced", q: "What is the disability-adjusted life year (DALY)?", a: "A DALY combines years of life lost (YLL) due to premature mortality and years lived with disability (YLD), weighted by disability severity, into a single measure of disease burden. One DALY equals one year of healthy life lost. DALYs underpin the Global Burden of Disease project.", ref: "Source: Murray CJL, Lopez AD. The Global Burden of Disease (WHO/Harvard, 1996); GBD Study", term: "DALY" },

  { cat: "advanced", q: "What are Years of Potential Life Lost (YPLL)?", a: "YPLL is a summary measure of premature mortality computed by subtracting age at death from a reference age (often 65 or 75) and summing across deaths. Causes that kill at younger ages — injuries, suicide, infant mortality — contribute disproportionately, making YPLL useful for setting prevention priorities.", ref: "Source: CDC Principles of Epidemiology, 3rd ed.; Gardner JW, Sanborn JS. Epidemiology 1990;1:322-9", term: "years of potential life lost" },

  { cat: "advanced", q: "What is molecular epidemiology?", a: "Molecular epidemiology integrates molecular biology (genomic sequencing, biomarkers, pathogen typing) with classical epidemiology to identify transmission chains, characterize variants, and study gene-environment interactions in disease causation.", ref: "Source: Schulte PA, Perera FP, eds. Molecular Epidemiology: Principles and Practices (Academic Press, 1993)", term: "molecular epidemiology" },

  { cat: "advanced", q: "What is genomic surveillance?", a: "Genomic surveillance is the systematic sequencing of pathogens from clinical or environmental samples to monitor variant emergence, antimicrobial resistance, and transmission dynamics in near real-time. It became central to the COVID-19, mpox, and HAI response.", ref: "Source: WHO Global Strategy for Genomic Surveillance of Pathogens (2022)", term: "genomic surveillance" },

  { cat: "advanced", q: "What is a meta-analysis?", a: "A meta-analysis is a quantitative synthesis that pools effect estimates across studies addressing the same question, weighting by precision. Random-effects models accommodate between-study heterogeneity; fixed-effect models assume one true effect. The forest plot displays study-specific and pooled estimates.", ref: "Source: Higgins JPT, Thomas J, eds. Cochrane Handbook for Systematic Reviews of Interventions, 6.x", term: "meta-analysis" },

  { cat: "advanced", q: "What is publication bias and how can it be assessed?", a: "Publication bias arises when statistically significant or 'positive' findings are more likely to be published, biasing systematic reviews. It can be detected with funnel plots (asymmetry suggests bias) and tested with Egger's regression or Begg's rank test. Trim-and-fill and PET-PEESE methods attempt adjustment.", ref: "Source: Egger M et al. BMJ 1997;315:629-34; Cochrane Handbook", term: "publication bias" },

  { cat: "advanced", q: "What is the I² statistic in meta-analysis?", a: "I² quantifies the percentage of variability in effect estimates that is attributable to between-study heterogeneity rather than sampling error. Conventional benchmarks treat I² of 25%, 50%, and 75% as low, moderate, and high heterogeneity, prompting random-effects modeling and subgroup analyses.", ref: "Source: Higgins JPT, Thompson SG. Stat Med 2002;21:1539-58", term: "I-squared heterogeneity" },

  { cat: "advanced", q: "What is Cohen's kappa?", a: "Cohen's kappa measures agreement between two raters on categorical data beyond what would be expected by chance. Values run from −1 to 1; benchmarks (Landis & Koch) call 0.21–0.40 fair, 0.41–0.60 moderate, 0.61–0.80 substantial, and 0.81–1.00 almost perfect.", ref: "Source: Cohen J. Educ Psychol Meas 1960;20:37-46; Landis JR, Koch GG. Biometrics 1977;33:159-74", term: "Cohen kappa" },

  { cat: "advanced", q: "What is the difference between validity and reliability?", a: "Validity is the degree to which a measurement reflects the true value of what it intends to measure. Reliability is the degree to which a measurement is reproducible under the same conditions. A measure can be reliable (consistent) but invalid (consistently wrong).", ref: "Source: Gordis, Epidemiology 5th ed., Ch. 5", term: "validity vs reliability" },

  { cat: "advanced", q: "What is the difference between syndromic and traditional surveillance?", a: "Syndromic surveillance monitors pre-diagnostic indicators (ED chief complaints, school absenteeism, pharmacy sales) for earlier outbreak detection. Traditional surveillance relies on confirmed clinical or laboratory diagnoses, providing higher specificity but later signal.", ref: "Source: CDC Principles of Epidemiology, 3rd ed., Lesson 5; Henning KJ. MMWR 2004;53:5-11", term: "syndromic surveillance" },

  { cat: "advanced", q: "What is the epidemiologic transition?", a: "The epidemiologic transition (Omran, 1971) describes the shift in dominant causes of death from infectious and nutritional diseases of the young to chronic, degenerative, and behavioral diseases of older adulthood, accompanying demographic and economic development.", ref: "Source: Omran AR. Milbank Mem Fund Q 1971;49:509-38", term: "epidemiologic transition" },

  { cat: "advanced", q: "What is precision medicine epidemiology?", a: "Precision medicine epidemiology integrates large-scale clinical, genomic, environmental, and lifestyle data to tailor prevention and treatment to subpopulations defined by their molecular and contextual characteristics, rather than to the 'average' patient.", ref: "Source: Khoury MJ et al. Am J Prev Med 2016;50:398-401; NIH All of Us program", term: "precision medicine epidemiology" },

  { cat: "advanced", q: "What is a test-negative case-control design?", a: "The test-negative design selects subjects who present with a disease-like syndrome and are tested for the pathogen of interest; cases are test-positive and controls are test-negative for that pathogen. It is now the standard for estimating real-world influenza and COVID-19 vaccine effectiveness.", ref: "Source: Jackson ML, Nelson JC. Vaccine 2013;31:2165-8; Fukushima W, Hirota Y. Vaccine 2017;35:4796-9", term: "test-negative design" },

  { cat: "advanced", q: "What is a 2×2 contingency table and what measures can be derived from it?", a: "A 2×2 table classifies subjects by exposure (yes/no) and outcome (yes/no). From the cell counts one can compute risk in exposed and unexposed, risk ratio, risk difference (attributable risk), odds ratio, attributable risk percent, sensitivity, specificity, PPV, NPV, and chi-square statistics.", ref: "Source: Gordis, Epidemiology 5th ed., Chs. 11–12; CDC Principles of Epidemiology, Lesson 3", term: "2x2 contingency table" },

  { cat: "advanced", q: "What is the rare disease assumption?", a: "The rare disease assumption holds that when the disease being studied is uncommon (typically <10%) in both the exposed and unexposed groups, the odds ratio from a case-control study closely approximates the risk ratio that a cohort study would have produced.", ref: "Source: Cornfield J. JNCI 1951;11:1269-75; Gordis Ch. 12", term: "rare disease assumption" },

  { cat: "advanced", q: "What is incidence density (incidence rate)?", a: "Incidence density (or incidence rate) is the number of new cases divided by total person-time at risk, with units of 1/time. Unlike cumulative incidence, it accommodates variable follow-up, late entry, and censoring — essential for open cohorts and survival analysis.", ref: "Source: Rothman, Greenland & Lash, Modern Epidemiology, 3rd ed.; Gordis Ch. 3", term: "incidence density" },

  { cat: "advanced", q: "What is target trial emulation?", a: "Target trial emulation is a framework for designing observational studies that explicitly mimics the protocol of the (hypothetical) randomized trial one would conduct to answer a causal question. It clarifies eligibility, treatment strategies, follow-up, outcomes, and analysis — and reveals common biases such as immortal time and prevalent-user bias.", ref: "Source: Hernán MA, Robins JM. Am J Epidemiol 2016;183:758-64", term: "target trial emulation" },

  { cat: "advanced", q: "What is immortal time bias?", a: "Immortal time bias arises when a period during which the outcome could not occur (e.g., time before treatment initiation) is misclassified as exposed person-time, spuriously favoring the exposed group. It commonly affects pharmacoepidemiologic studies and is mitigated by time-varying exposure analysis or target trial emulation.", ref: "Source: Suissa S. Am J Epidemiol 2008;167:492-9", term: "immortal time bias" },

  { cat: "advanced", q: "What is a competing risk?", a: "A competing risk is an event whose occurrence either precludes or alters the probability of the event of interest — e.g., death from cardiovascular disease in a cancer-mortality study. Standard Kaplan-Meier methods overestimate the cumulative incidence of the event when competing risks are present; cumulative incidence functions or Fine-Gray models are preferred.", ref: "Source: Fine JP, Gray RJ. JASA 1999;94:496-509; Putter H et al. Stat Med 2007;26:2389-430", term: "competing risk" }

];

// ===================================================================
// APP STATE
// ===================================================================
const state = {
  category: null,     // selected category: "public" | "student" | "advanced" | "all"
  pool: [],           // CARDS indices currently in scope (filtered by category)
  deck: [],           // shuffled/ordered indices for the current play
  position: 0,        // current index in deck
  reviewed: new Set(),
  bookmarks: new Set(),
  isFlipped: false,
  timerMode: false,
  timerDuration: 10,
  timerInterval: null,
  timerRemaining: 0,
  shuffle: true,
  running: false,
  cookiesAccepted: null, // true | false | null (undecided)
};

const CATEGORY_LABELS = {
  public:   "General Public",
  student:  "Undergraduate / Graduate Students",
  advanced: "Advanced / Doctoral Level",
  all:      "All Categories",
};

// ===================================================================
// DOM REFS
// ===================================================================
const dom = {
  flashcard:        () => document.getElementById('flashcard'),
  cardQuestion:     () => document.getElementById('card-question'),
  cardAnswer:       () => document.getElementById('card-answer'),
  cardRef:          () => document.getElementById('card-ref'),
  cardScene:        () => document.getElementById('card-scene'),
  emptyState:       () => document.getElementById('empty-state'),

  timerWrap:        () => document.getElementById('timer-ring-wrap'),
  timerFill:        () => document.getElementById('timer-ring-fill'),
  timerText:        () => document.getElementById('timer-ring-text'),

  btnManual:        () => document.getElementById('btn-mode-manual'),
  btnTimer:         () => document.getElementById('btn-mode-timer'),
  timerOptions:     () => document.getElementById('timer-options'),
  timerSelect:      () => document.getElementById('timer-select'),
  shuffleCheck:     () => document.getElementById('shuffle-check'),

  counterNumber:    () => document.getElementById('counter-number'),
  counterTotal:     () => document.getElementById('counter-total'),
  progressFill:     () => document.getElementById('progress-fill'),

  btnPrev:          () => document.getElementById('btn-prev'),
  btnNext:          () => document.getElementById('btn-next'),
  btnFlip:          () => document.getElementById('btn-flip'),
  btnStart:         () => document.getElementById('btn-start'),
  btnRestart:       () => document.getElementById('btn-restart'),

  btnLearnMore:     () => document.getElementById('btn-learn-more'),
  btnBookmark:      () => document.getElementById('btn-bookmark'),

  bookmarksSection: () => document.getElementById('bookmarks-section'),
  bookmarksTextarea:() => document.getElementById('bookmarks-textarea'),
  bookmarkCountBadge:() => document.getElementById('bookmark-count-badge'),
  btnCopy:          () => document.getElementById('btn-copy'),
  btnDownloadRtf:   () => document.getElementById('btn-download-rtf'),
  btnClearBookmarks:() => document.getElementById('btn-clear-bookmarks'),
  copyFeedback:     () => document.getElementById('copy-feedback'),

  themeToggle:      () => document.getElementById('theme-toggle'),
  toastArea:        () => document.getElementById('toast-area'),

  // Category picker
  categoryPicker:   () => document.getElementById('category-picker'),
  categoryCards:    () => document.querySelectorAll('.category-card'),
  selectedCategoryBadge: () => document.getElementById('selected-category-badge'),
  btnChangeCategory:() => document.getElementById('btn-change-category'),

  // Cookie banner
  cookieBanner:     () => document.getElementById('cookie-banner'),
  cookieAccept:     () => document.getElementById('cookie-accept'),
  cookieReject:     () => document.getElementById('cookie-reject'),
};

// ===================================================================
// UTILITIES
// ===================================================================
function shuffleArr(arr) {
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
// COOKIE CONSENT (stored in localStorage only if accepted)
// ===================================================================
function initCookieBanner() {
  let stored = null;
  try { stored = localStorage.getItem('epi_cookie_consent'); } catch (e) {}

  if (stored === 'accepted') {
    state.cookiesAccepted = true;
    hideCookieBanner();
    return;
  }
  if (stored === 'rejected') {
    state.cookiesAccepted = false;
    hideCookieBanner();
    return;
  }
  // Undecided — show banner
  showCookieBanner();
}

function showCookieBanner() {
  const b = dom.cookieBanner();
  if (b) b.classList.add('is-visible');
}
function hideCookieBanner() {
  const b = dom.cookieBanner();
  if (b) b.classList.remove('is-visible');
}

function acceptCookies() {
  state.cookiesAccepted = true;
  try { localStorage.setItem('epi_cookie_consent', 'accepted'); } catch (e) {}
  hideCookieBanner();
  showToast('Cookies accepted.');
}

function rejectCookies() {
  state.cookiesAccepted = false;
  // Try to also clear any persisted preferences if user opts out
  try {
    // Use sessionStorage as fallback so consent decision lasts the tab session
    sessionStorage.setItem('epi_cookie_consent', 'rejected');
    // Remove non-essential persisted prefs
    localStorage.removeItem('epi_theme');
  } catch (e) {}
  // Also persist the rejection itself (rejection record is essential to honor the choice)
  try { localStorage.setItem('epi_cookie_consent', 'rejected'); } catch (e) {}
  hideCookieBanner();
  showToast('Optional cookies declined.');
}

function canPersist() {
  return state.cookiesAccepted === true;
}

// ===================================================================
// CATEGORY SELECTION
// ===================================================================
function selectCategory(cat) {
  state.category = cat;
  state.pool = (cat === 'all')
    ? CARDS.map((_, i) => i)
    : CARDS.map((c, i) => c.cat === cat ? i : -1).filter(i => i >= 0);

  state.reviewed.clear();
  state.deck = [];
  state.position = 0;
  state.running = false;

  // Hide picker, show study UI
  const picker = dom.categoryPicker();
  if (picker) picker.style.display = 'none';

  // Show main study UI
  document.getElementById('study-area').style.display = '';

  // Update counter total
  dom.counterTotal().textContent = state.pool.length;
  dom.counterNumber().textContent = '0';
  dom.progressFill().style.width = '0%';

  // Update badge
  const badge = dom.selectedCategoryBadge();
  if (badge) {
    badge.querySelector('.badge-label').textContent = CATEGORY_LABELS[cat] || cat;
    badge.querySelector('.badge-count').textContent = `${state.pool.length} cards`;
    badge.style.display = '';
  }

  // Reset to start state
  dom.emptyState().style.display = '';
  dom.cardScene().style.display = 'none';
  document.getElementById('nav-row').style.display = 'none';
  document.getElementById('keyboard-hint').style.display = 'none';
  document.getElementById('btn-start').style.display = '';
  document.getElementById('btn-restart').style.display = 'none';

  // Persist (only if cookies accepted)
  if (canPersist()) {
    try { localStorage.setItem('epi_category', cat); } catch (e) {}
  }
}

function showCategoryPicker() {
  // Hide study area, show picker
  document.getElementById('study-area').style.display = 'none';
  const picker = dom.categoryPicker();
  if (picker) picker.style.display = '';
  clearTimer();
}

// ===================================================================
// TIMER LOGIC
// ===================================================================
const TIMER_CIRCUMFERENCE = 2 * Math.PI * 22;

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
      flipCard();
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
  el.classList.remove('is-flipped');
  state.isFlipped = false;

  dom.cardQuestion().textContent = card.q;
  dom.cardAnswer().textContent = card.a;
  dom.cardRef().textContent = card.ref;

  const learnBtn = dom.btnLearnMore();
  learnBtn.href = buildLearnMoreURL(card.term);

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

  if (state.timerMode) startTimer();
}

// ===================================================================
// FLIP / NAVIGATION
// ===================================================================
function flipCard() {
  if (!state.running) return;
  const el = dom.flashcard();
  clearTimer();

  if (!state.isFlipped) {
    el.classList.add('is-flipped');
    state.isFlipped = true;
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

function goNext() {
  if (!state.running) return;
  clearTimer();
  if (state.position < state.deck.length - 1) {
    state.position++;
    renderCard();
  } else {
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
  const total = state.pool.length;
  dom.counterNumber().textContent = reviewed;
  dom.counterTotal().textContent = total;
  const pct = total ? (reviewed / total) * 100 : 0;
  dom.progressFill().style.width = pct + '%';
}

// ===================================================================
// START / RESTART
// ===================================================================
function buildDeck() {
  const indices = [...state.pool];
  return state.shuffle ? shuffleArr(indices) : indices;
}

function startDeck() {
  state.deck = buildDeck();
  state.position = 0;
  state.running = true;

  dom.cardScene().style.display = '';
  dom.emptyState().style.display = 'none';
  document.getElementById('nav-row').style.display = '';
  document.getElementById('keyboard-hint').style.display = '';
  document.getElementById('btn-start').style.display = 'none';
  document.getElementById('btn-restart').style.display = '';

  renderCard();
}

function restartDeck() {
  clearTimer();
  state.reviewed.clear();
  state.deck = buildDeck();
  state.position = 0;
  state.isFlipped = false;
  renderCard();
  showToast('Deck restarted.');
  updateCounter();
}

// ===================================================================
// BOOKMARKS
// ===================================================================
function toggleBookmark() {
  const cardIdx = state.deck[state.position];
  const bBtn = dom.btnBookmark();

  if (state.bookmarks.has(cardIdx)) {
    state.bookmarks.delete(cardIdx);
    bBtn.classList.remove('is-bookmarked');
    bBtn.querySelector('.btn-bookmark-label').textContent = 'Mark for review';
    showToast('Bookmark removed.');
  } else {
    state.bookmarks.add(cardIdx);
    bBtn.classList.add('is-bookmarked');
    bBtn.querySelector('.btn-bookmark-label').textContent = 'Bookmarked';
    showToast('Term marked for review.');
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
    dom.bookmarksTextarea().select();
    document.execCommand('copy');
    showToast('Copied to clipboard.');
  });
}

function clearBookmarks() {
  state.bookmarks.clear();
  updateBookmarksPanel();
  const bBtn = dom.btnBookmark();
  if (bBtn) {
    bBtn.classList.remove('is-bookmarked');
    const lbl = bBtn.querySelector('.btn-bookmark-label');
    if (lbl) lbl.textContent = 'Mark for review';
  }
  showToast('All bookmarks cleared.');
}

// ===================================================================
// RTF DOWNLOAD (notes)
// ===================================================================
function rtfEscape(s) {
  // Escape backslash, braces, and convert non-ASCII to RTF unicode escapes.
  if (!s) return '';
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const code = s.charCodeAt(i);
    if (ch === '\\') { out += '\\\\'; }
    else if (ch === '{') { out += '\\{'; }
    else if (ch === '}') { out += '\\}'; }
    else if (ch === '\n') { out += '\\line '; }
    else if (code < 128) { out += ch; }
    else {
      // RTF \u uses signed 16-bit decimal; emit ? as replacement
      let signed = code;
      if (signed > 32767) signed -= 65536;
      out += `\\u${signed}?`;
    }
  }
  return out;
}

function buildRtf() {
  const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const catLabel = CATEGORY_LABELS[state.category] || 'All Categories';

  let body = '';
  body += `{\\b\\fs36 Epidemiology Flashcards ${rtfEscape('—')} Terms to Follow Up}\\line\\line `;
  body += `{\\b Category:} ${rtfEscape(catLabel)}\\line `;
  body += `{\\b Date:} ${rtfEscape(today)}\\line `;
  body += `{\\b Total terms marked:} ${state.bookmarks.size}\\line\\line `;

  let i = 1;
  state.bookmarks.forEach(idx => {
    const c = CARDS[idx];
    body += `{\\b\\fs26 ${i}. ${rtfEscape(c.q)}}\\line `;
    body += `${rtfEscape(c.a)}\\line `;
    if (c.ref) {
      body += `{\\i ${rtfEscape(c.ref)}}\\line `;
    }
    body += `\\line `;
    i++;
  });

  body += `\\line {\\i Generated by Epi Flashcards (https://epidemiological.net). `;
  body += `Licensed CC BY-NC 4.0 ${rtfEscape('—')} Attribution-NonCommercial.}\\line `;

  // Minimal RTF wrapper with Unicode + UTF support
  const rtf =
    '{\\rtf1\\ansi\\ansicpg1252\\deff0\\uc1' +
    '{\\fonttbl{\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset0 Cambria;}}' +
    '\\fs22 ' +
    body +
    '}';
  return rtf;
}

function downloadRtf() {
  if (state.bookmarks.size === 0) {
    showToast('No terms marked yet.');
    return;
  }
  const rtf = buildRtf();
  const blob = new Blob([rtf], { type: 'application/rtf' });
  const url = URL.createObjectURL(blob);
  const stamp = new Date().toISOString().slice(0, 10);
  const a = document.createElement('a');
  a.href = url;
  a.download = `epi-flashcards-notes-${stamp}.rtf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast('Notes downloaded as RTF.');
}

// ===================================================================
// THEME TOGGLE
// ===================================================================
function initTheme() {
  const html = document.documentElement;
  let theme;
  try {
    if (canPersist()) {
      theme = localStorage.getItem('epi_theme');
    }
  } catch (e) {}
  if (!theme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }
  html.setAttribute('data-theme', theme);
  updateThemeIcon(theme);

  dom.themeToggle().addEventListener('click', () => {
    const cur = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', cur);
    updateThemeIcon(cur);
    if (canPersist()) {
      try { localStorage.setItem('epi_theme', cur); } catch (e) {}
    }
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

  dom.timerSelect().addEventListener('change', (e) => {
    state.timerDuration = parseInt(e.target.value, 10);
    if (state.timerMode && state.running && !state.isFlipped) startTimer();
  });

  dom.shuffleCheck().addEventListener('change', (e) => {
    state.shuffle = e.target.checked;
  });

  dom.flashcard().addEventListener('click', () => {
    if (!state.isFlipped) flipCard();
  });

  dom.btnFlip().addEventListener('click', () => flipCard());
  dom.btnNext().addEventListener('click', () => goNext());
  dom.btnPrev().addEventListener('click', () => goPrev());

  document.addEventListener('keydown', (e) => {
    if (!state.running) return;
    const tag = document.activeElement?.tagName;
    if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT' || tag === 'BUTTON') {
      // Allow normal interaction with form controls
      if (tag !== 'BUTTON') return;
    }
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
        if (tag === 'BUTTON') return;
        e.preventDefault();
        flipCard();
        break;
      case 'b':
      case 'B':
        if (state.isFlipped) toggleBookmark();
        break;
    }
  });

  dom.btnStart().addEventListener('click', () => startDeck());
  dom.btnRestart().addEventListener('click', () => restartDeck());

  dom.btnBookmark().addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBookmark();
  });

  document.getElementById('bookmarks-header').addEventListener('click', () => {
    dom.bookmarksSection().classList.toggle('is-open');
  });

  dom.btnCopy().addEventListener('click', () => copyBookmarks());
  dom.btnDownloadRtf().addEventListener('click', () => downloadRtf());
  dom.btnClearBookmarks().addEventListener('click', () => clearBookmarks());

  // Category picker buttons
  dom.categoryCards().forEach(el => {
    el.addEventListener('click', () => selectCategory(el.dataset.category));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCategory(el.dataset.category);
      }
    });
  });

  // Change category button
  const cc = dom.btnChangeCategory();
  if (cc) cc.addEventListener('click', () => showCategoryPicker());

  // Cookie banner
  const ca = dom.cookieAccept();
  const cr = dom.cookieReject();
  if (ca) ca.addEventListener('click', () => acceptCookies());
  if (cr) cr.addEventListener('click', () => rejectCookies());
}

// ===================================================================
// INIT
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initTheme();
  initEvents();

  // Hide study area initially — user must pick a category first
  document.getElementById('study-area').style.display = 'none';
  dom.cardScene().style.display = 'none';
  document.getElementById('nav-row').style.display = 'none';
  document.getElementById('btn-restart').style.display = 'none';
  dom.timerOptions().style.display = 'none';

  const fill = dom.timerFill();
  if (fill) {
    fill.style.strokeDasharray = TIMER_CIRCUMFERENCE;
    fill.style.strokeDashoffset = 0;
  }

  // Populate category counts in the picker
  const counts = { public: 0, student: 0, advanced: 0 };
  CARDS.forEach(c => { if (counts[c.cat] !== undefined) counts[c.cat]++; });
  document.querySelectorAll('.category-card').forEach(el => {
    const cat = el.dataset.category;
    const countEl = el.querySelector('.category-count');
    if (countEl) {
      if (cat === 'all') {
        countEl.textContent = `${CARDS.length} cards`;
      } else {
        countEl.textContent = `${counts[cat] || 0} cards`;
      }
    }
  });

  // Restore last category only if user consented to cookies
  let savedCat = null;
  try {
    if (canPersist()) savedCat = localStorage.getItem('epi_category');
  } catch (e) {}
  if (savedCat && (savedCat in CATEGORY_LABELS)) {
    selectCategory(savedCat);
  }

  updateBookmarksPanel();
});

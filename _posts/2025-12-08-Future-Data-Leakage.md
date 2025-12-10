---
layout: post
title: "Future Data Leakage in (subset of) MIMIC-IV Readmission EHR Dataset"
date: 2025-12-08 03:00:00 +0800
categories: blog
---

It has been a long time that I don't write any blogs.

Note: This is a cross-post from my Kaggle competition discussion. It is private right now but the professor/TA could make it public if they want to.

Anyway, lets talk about our main topic: Future Data Leakage.

In Electronic Health Records (abbr: EHR) datasets, we (usually) have variable number of rows per patient admission, and one label (corresponding to that admission) as our base prediction unit. Unfortunately (and logically), some admissions are correlated, as they could come from the same patient (obviously), or there was an public incident (disasters), pandemic outbreak, or annual events, etc.

We are going to talk about the *Readmission Prediction* task. Our job is given a list (time series within 1 admission) of patient vitals (E.g. blood pressure, heart rate, laboratory test results), medicine adminstrated, patient demographics (age, ethnicity, gender), etc., to predict whether the patient will be readmitted within 30 days after his hospital discharge (aka. come back within 30 days after he leaves the hospital).

There was one particular flaw (or, a feature?) in the subset of dataset we received (the professor gave us in [HKU STAT3612](https://webapp.science.hku.hk/sr4/servlet/enquiry?Type=Course&course_code=STAT3612)), in which, if the patient only appear once in the dataset, then we can successfully infer that he didn't come back hospital after his only recorded admission in our database.

This approach has two problems:

1. It won't work for patient databases that are incomplete. E.g. we don't have all the admissions of a patient, or the patient moved to another hospital after his first admission.
2. The model is biased when predicting patients with only one admission in the dataset (e.g. predict `False` for most of them). While it might work well in this particular dataset, it won't generalize well to real-life data, especially if the real-life patient admission is diverse enough. For example, under a pandemic situation, many patients might only have one admission (the first time they got infected), but they might come back again later (e.g. due to complications). In this case, a model focusing on patient vitals and demographics would be more robust (in terms of distribution shift) than a model relying on admission counts.

But apparently, with a simple logic like this, we were able to boost our AUROC (Area Under Receiver Operating Characteristic curve) score from 0.5 (basically means the model is guessing randomly) to 0.617:

```python
import pandas as pd
from sklearn.metrics import roc_auc_score

label = "readmitted_within_30days"

train = pd.read_csv("train.csv").drop_duplicates(subset="id")
valid = pd.read_csv("valid.csv").drop_duplicates(subset="id")

train_visit_counts = train["subject_id"].value_counts()
valid_visit_counts = valid["subject_id"].value_counts()

def predict(row, visit_counts):
    patient_only_visit_once = visit_counts.get(row["subject_id"], 1) == 1
    if patient_only_visit_once:
        return 0
    return 1

train["prediction"] = train.apply(lambda row: predict(row, train_visit_counts), axis=1)
valid["prediction"] = valid.apply(lambda row: predict(row, valid_visit_counts), axis=1)

print(f"Train AUROC: {roc_auc_score(train[label], train["prediction"]):.4f}")
print(f"Valid AUROC: {roc_auc_score(valid[label], valid["prediction"]):.4f}")
```

Which is pretty amazing. And we were able to obtain AUROC of `0.95` on the public leaderboard (50%, ~1000 test data) and secure the top 1 (on Public LB). For private leaderboard, that is another story.

Anyway, the professor banned this technique which is totally reasonable given that this is an severe data leakage (this could harm your model performance when being feed with real-life data). But I think this is quite interesting, and I would like to share it here.

A sample codebase implementing a complete machine learning pipeline on this dataset can be found here: <https://github.com/eric15342335/STAT3612-MIMIC-IV-Readmission-Prediction-Demo>. Note that this is just a demo codebase which was created separately after the competition.

Good luck with everyone!

# Health Status Test Examples

## How Health Status Works

The AI analyzes the pet's medical history and returns statuses like:
- **"Healthy"** → Green pill ✅
- **"Needs Attention"** → Orange pill ⚠️
- **"Due for Checkup"** → Orange pill ⚠️
- **Other statuses** → Red pill ❌

## Test Case 1: Pet with No Vaccinations (Should show "Needs Attention")

### Pet Data to Create:
```json
{
  "name": "TestPet",
  "species": "dog",
  "breed": "Labrador",
  "age": 2,
  "gender": "Male",
  "weight": 25,
  "medicalHistory": {
    "vaccinations": [],  // ⚠️ NO VACCINATIONS - This triggers "Needs Attention"
    "chronicConditions": [],
    "currentMedications": []
  }
}
```

**Expected Status**: "Needs Attention" or "Due for Checkup" (Orange pill)
**Reason**: No vaccinations recorded - AI will flag this as needing attention

---

## Test Case 2: Senior Pet with Multiple Conditions (Should show "Needs Attention")

### Pet Data to Create:
```json
{
  "name": "SeniorDog",
  "species": "dog",
  "breed": "German Shepherd",
  "age": 12,  // ⚠️ Senior age
  "gender": "Female",
  "weight": 35,
  "medicalHistory": {
    "vaccinations": ["Rabies", "DHPP"],
    "chronicConditions": [
      "Arthritis",
      "Kidney Disease",
      "Diabetes"
    ],  // ⚠️ Multiple chronic conditions
    "currentMedications": [
      {
        "name": "Pain Medication",
        "dosage": "Twice daily"
      },
      {
        "name": "Kidney Support",
        "dosage": "Daily"
      },
      {
        "name": "Insulin",
        "dosage": "Twice daily"
      }
    ]  // ⚠️ Multiple medications
  }
}
```

**Expected Status**: "Needs Attention" or "On Medication" (Orange/Red pill)
**Reason**: Senior pet with multiple chronic conditions and medications

---

## Test Case 3: Puppy Missing Vaccinations (Should show "Needs Attention")

### Pet Data to Create:
```json
{
  "name": "PuppyTest",
  "species": "dog",
  "breed": "Beagle",
  "age": 0.3,  // ⚠️ 3-4 months old - should have vaccinations
  "gender": "Male",
  "weight": 5,
  "medicalHistory": {
    "vaccinations": [],  // ⚠️ Puppy with no vaccinations
    "chronicConditions": [],
    "currentMedications": [
      {
        "name": "Deworming",
        "dosage": "Weekly"
      }
    ]
  }
}
```

**Expected Status**: "Needs Attention" or "Due for Checkup" (Orange pill)
**Reason**: Young puppy without core vaccinations

---

## Test Case 4: Pet with Serious Chronic Condition (Should show Red status)

### Pet Data to Create:
```json
{
  "name": "SickPet",
  "species": "cat",
  "breed": "Persian",
  "age": 5,
  "gender": "Female",
  "weight": 3.5,
  "medicalHistory": {
    "vaccinations": ["FVRCP", "Rabies"],
    "chronicConditions": [
      "Feline Leukemia",
      "Chronic Kidney Disease"
    ],  // ⚠️ Serious conditions
    "currentMedications": [
      {
        "name": "Chemotherapy",
        "dosage": "Weekly"
      },
      {
        "name": "Kidney Support",
        "dosage": "Daily"
      }
    ]
  }
}
```

**Expected Status**: May show condition name or "Needs Attention" (Red/Orange pill)
**Reason**: Serious chronic conditions requiring ongoing treatment

---

## Test Case 5: Healthy Pet (Should show "Healthy")

### Pet Data to Create:
```json
{
  "name": "HealthyPet",
  "species": "cat",
  "breed": "Maine Coon",
  "age": 3,
  "gender": "Male",
  "weight": 6,
  "medicalHistory": {
    "vaccinations": [
      "FVRCP",
      "Rabies",
      "Feline Leukemia"
    ],  // ✅ Up-to-date vaccinations
    "chronicConditions": [],  // ✅ No chronic conditions
    "currentMedications": []  // ✅ No medications needed
  }
}
```

**Expected Status**: "Healthy" (Green pill) ✅
**Reason**: All vaccinations up-to-date, no conditions, no medications

---

## How to Test via API

### 1. Create a test pet with unhealthy conditions:
```bash
POST http://localhost:3000/pets/owner/{ownerId}
Content-Type: application/json
Authorization: Bearer {your_token}

{
  "name": "UnhealthyTest",
  "species": "dog",
  "breed": "Golden Retriever",
  "age": 8,
  "gender": "Male",
  "weight": 30,
  "medicalHistory": {
    "vaccinations": [],
    "chronicConditions": ["Hip Dysplasia", "Arthritis"],
    "currentMedications": [
      {"name": "Pain Relief", "dosage": "Daily"},
      {"name": "Joint Supplement", "dosage": "Twice daily"}
    ]
  }
}
```

### 2. Get the health status:
```bash
GET http://localhost:3000/ai/pets/{petId}/status
Authorization: Bearer {your_token}
```

### 3. Expected Response:
```json
{
  "status": "Needs Attention",
  "pills": [
    {
      "text": "Needs Attention",
      "bg": "#F97316",
      "fg": "#9A3412"
    }
  ],
  "summary": "⚠ Needs vaccines | 2 med | 30.0 kg"
}
```

---

## Quick Test via iOS App

1. **Add a new pet** with:
   - **No vaccinations** (leave empty)
   - **At least one chronic condition** (e.g., "Arthritis", "Diabetes")
   - **Multiple medications** (e.g., 2-3 medications)

2. **Go to Home page** - the health snapshot should show:
   - Orange "Needs Attention" pill, OR
   - Red status pill with condition name

3. **Check the summary** - should show:
   - "⚠ Needs vaccines" (if no vaccinations)
   - "X med" (number of medications)
   - Weight

---

## Tips for Testing

- **No Vaccinations**: Always triggers "Needs Attention"
- **Senior Age (10+ years)**: More likely to show "Needs Attention"
- **Multiple Medications (3+)**: Indicates ongoing health issues
- **Serious Conditions**: "Cancer", "Kidney Disease", "Diabetes" → Red status
- **Puppy with No Vaccines**: Always needs attention

The AI will analyze all these factors and return an appropriate status!


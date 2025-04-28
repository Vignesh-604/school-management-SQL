# **School Management System**

## 1. Database Setup
**Table:** `schools`

| Column    | Type     | Description                |
|:--------- |:---------|:----------------------------|
| id        | INT (Primary Key, Auto Increment) |
| name      | VARCHAR  | Name of the school           |
| address   | VARCHAR  | Address of the school        |
| latitude  | FLOAT    | Latitude of the school       |
| longitude | FLOAT    | Longitude of the school      |

---

## 2. API Development

### **Add School API**

- **Endpoint:** `/addSchool`
- **Method:** `POST`
- **Request Body (JSON):**

```json
{
  "name": "Sample School",
  "address": "123 Main Street",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

- **Functionality:**
  - Validates input (non-empty, correct types).
  - Inserts new school into the database.

- **Success Response:**

```json
{
  "message": "School added successfully"
}
```

---

### **List Schools API**

- **Endpoint:** `/listSchools`
- **Method:** `GET`
- **Request Body (JSON):**

```json
{
  "latitude": 28.7041,
  "longitude": 77.1025
}
```

- **Functionality:**
  - Fetches all schools.
  - Calculates distance from user’s location.
  - Returns sorted list by proximity (nearest first).

- **Success Response Example:**

```json
{
  "message": "Schools listed",
  "data": [
    {
      "id": 1,
      "name": "Sample School",
      "address": "123 Main Street",
      "latitude": 28.6139,
      "longitude": 77.2090,
      "distance": 10.2
    }
  ]
}
```

---

## 3. Hosting Details

- **Hosting Platform:** Railway
- **Live Base URL:**  
```
https://school-management-sql-production.up.railway.app
```
> [!NOTE] May take someto fetch data from railway so have patience keep trying!
---

## 4. Postman Collection

- **Collection Includes:** 
  - `/addSchool` (POST)
  - `/listSchools` (GET)

- **Shared Link:**  
- Import the Collection in Postman
- Open Postman.
- Click "Import" (top-left).
- Select "Link".
- Paste your Collection URL 

Click Continue → Import.
[Postman collection link](https://api.postman.com/collections/32503444-72c01599-1112-46ad-9da9-513b9ff460a7)

---

## 5. Deliverables Checklist

- [x] Source code repository (Node.js + Express + MySQL)
- [x] Live API hosted
- [x] Postman collection created and shared
- [x] All APIs tested and working using Postman

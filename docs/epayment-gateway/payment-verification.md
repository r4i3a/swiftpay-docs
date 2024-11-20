---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Payment Verification
After a callback is received, You can use the `tnx` provided earlier, to lookup and reassure the payment status.

## SPG Lookups 
Learn how to verify the status of a payment transaction using the SwiftPay API. You can look up a transaction using the `tnx` (transaction ID) returned from the initiation request.

### Base URL
```
https://pay.raisa.com.np
```

### Verification Endpoint

| URL | Method | Authorization | Format | 
| -- | -- | -- |  -- | 
api/v1/lookup |  POST | Required | application/json

### Headers Required
- `x-swiftpay-token`: Your SwiftPay API token
- `x-swiftpay-environment`: API environment (`production` or `sandbox`)
- `Content-Type`: `application/json`

### Request Data
```json
{
   "tnx": "SWIFTPAY-8AC2389A-ACF2-47A9-8D4B-CEA68E931DD8-EWP"
}
```

## Implementation Examples

<Tabs>
  <TabItem value="curl" label="cURL" default>
```bash
curl --location 'https://pay.raisa.com.np/api/v1/lookup' \
--header 'x-swiftpay-token: YOUR_SWIFTPAY_TOKEN' \
--header 'x-swiftpay-environment: production' \
--header 'Content-Type: application/json' \
--data '{
    "tnx": "SWIFTPAY-8AC2389A-ACF2-47A9-8D4B-CEA68E931DD8-EWP"
}'
```
  </TabItem>

  <TabItem value="javascript" label="JavaScript">
```javascript
const verifyPayment = async (transactionId) => {
  const response = await fetch('https://pay.raisa.com.np/api/v1/lookup', {
    method: 'POST',
    headers: {
      'x-swiftpay-token': 'YOUR_SWIFTPAY_TOKEN',
      'x-swiftpay-environment': 'production',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tnx: transactionId
    })
  });

  const data = await response.json();
  return data;
};
```
  </TabItem>

  <TabItem value="python" label="Python">
```python
import requests

def verify_payment(transaction_id):
    url = "https://pay.raisa.com.np/api/v1/lookup"
    
    headers = {
        "x-swiftpay-token": "YOUR_SWIFTPAY_TOKEN",
        "x-swiftpay-environment": "production",
        "Content-Type": "application/json"
    }
    
    payload = {
        "tnx": transaction_id
    }
    
    response = requests.post(url, headers=headers, json=payload)
    return response.json()
```
  </TabItem>

  <TabItem value="go" label="Go">
```go
package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

func verifyPayment(transactionId string) (map[string]interface{}, error) {
    url := "https://pay.raisa.com.np/api/v1/lookup"
    
    payload := map[string]string{
        "tnx": transactionId,
    }
    
    jsonPayload, err := json.Marshal(payload)
    if err != nil {
        return nil, err
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
    if err != nil {
        return nil, err
    }

    req.Header.Set("x-swiftpay-token", "YOUR_SWIFTPAY_TOKEN")
    req.Header.Set("x-swiftpay-environment", "production")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    return result, nil
}
```
  </TabItem>

  <TabItem value="dart" label="Dart">
```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<Map<String, dynamic>> verifyPayment(String transactionId) async {
  final url = Uri.parse('https://pay.raisa.com.np/api/v1/lookup');
  
  final response = await http.post(
    url,
    headers: {
      'x-swiftpay-token': 'YOUR_SWIFTPAY_TOKEN',
      'x-swiftpay-environment': 'production',
      'Content-Type': 'application/json'
    },
    body: jsonEncode({
      'tnx': transactionId
    })
  );

  if (response.statusCode == 200) {
    return jsonDecode(response.body);
  } else {
    throw Exception('Failed to verify payment');
  }
}
```
  </TabItem>

  <TabItem value="php" label="PHP">
```php
<?php

function verifyPayment($transactionId) {
    $url = "https://pay.raisa.com.np/api/v1/lookup";
    
    $headers = array(
        "x-swiftpay-token: YOUR_SWIFTPAY_TOKEN",
        "x-swiftpay-environment: production",
        "Content-Type: application/json"
    );
    
    $payload = json_encode(array(
        "tnx" => $transactionId
    ));
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}
```
  </TabItem>
</Tabs>

## Response Example

<Tabs>
  <TabItem value="preparing" label="Initiated" default>
```json
{
    "tnx": "SWIFTPAY-8AC2389A-ACF2-47A9-8D4B-CEA68E931DD8-EWP",
    "amount": "500.00",
    "status": "preparing",
    "transaction": "YOUR_TRANSACTION_ID",
    "environment": "production",
    "fee": "14.50",
    "refunded": false
}
```
  </TabItem>
   <TabItem value="pending" label="Pending" default>
```json
{
    "tnx": "SWIFTPAY-8AC2389A-ACF2-47A9-8D4B-CEA68E931DD8-EWP",
    "amount": "500.00",
    "status": "pending",
    "transaction": "YOUR_TRANSACTION_ID",
    "environment": "production",
    "fee": "14.50",
    "refunded": false
}
```
  </TabItem>
  <TabItem value="success" label="Success" default>
```json
{
    "tnx": "SWIFTPAY-8AC2389A-ACF2-47A9-8D4B-CEA68E931DD8-EWP",
    "amount": "500.00",
    "status": "completed",
    "transaction": "YOUR_TRANSACTION_ID",
    "environment": "production",
    "fee": "14.50",
    "refunded": false
}
```
  </TabItem>
   <TabItem value="refunded" label="Refunded" default>
```json
{
    "tnx": "SWIFTPAY-8AC2389A-ACF2-47A9-8D4B-CEA68E931DD8-EWP",
    "amount": "500.00",
    "status": "refunded",
    "transaction": "YOUR_TRANSACTION_ID",
    "environment": "production",
    "fee": "14.50",
    "refunded": true
}
```
  </TabItem>
  <TabItem value="failed" label="Canceled" default>
```json
{
    "tnx": "SWIFTPAY-8AC2389A-ACF2-47A9-8D4B-CEA68E931DD8-EWP",
    "amount": "500.00",
    "status": "failed",
    "transaction": "YOUR_TRANSACTION_ID",
    "environment": "production",
    "fee": "14.50",
    "refunded": false
}
```
  </TabItem>
  <TabItem value="expired" label="Expired" default>
```json
{
    "tnx": "SWIFTPAY-8AC2389A-ACF2-47A9-8D4B-CEA68E931DD8-EWP",
    "amount": "500.00",
    "status": "expired",
    "transaction": "YOUR_TRANSACTION_ID",
    "environment": "production",
    "fee": "14.50",
    "refunded": false
}
```
  </TabItem>
</Tabs>

### Payment Status Code
| Status | Status Code |
| -- | -- | 
| Completed | 200 |
| Pending | 200 |
| Expired |  400 |
| Initiated | 200 |
| Refunded | 200 |
| User canceled | 400 |
|Partially refunded | 400 |

### Lookup Payload Details  
| Status | Description | 
| -- | -- | 
| tnx | This is the payment id of the transaction. 
| amount | This is the total amount of the transaction
| status | `Completed` - Transaction is success <br />`Pending` - Transaction is failed or is in pending state <br />`Refunded` - Transaction has been refunded<br />`Expired` - This payment link has expired <br />`User canceled` - Transaction has been canceled by the user <br />`Partially refunded` - Transaction has been partially refunded by the user
| transaction | This is the transaction id for the transaction from `merchant`. <br />This is the unique identifier. 
| fee | The fee that has been set for the merchant.
| refunded | `True` - The transaction has been refunded. <br />`False` - The transaction has not been refunded.


### Lookup status
| Field | Description |
| -- | -- |
| Completed | Provide service to user. 
| Pending | Hold, do not provide service. And contact SwiftPay team. 
| Refunded | Transaction has been refunded to user. Do not provide service.
| Expired | User have not made the payment, Do not provide the service.
| User canceled | User have canceled the payment, Do not provide the service.

:::note Important note  
    + Only the status with **Completed** must be treated as success. 
    + Status **Canceled** , **Expired** , **Failed** must be treated as failed.
    + If any negative consequences occur due to incomplete API integration or providing service without checking lookup status, SwiftPay won’t be accountable for any such losses.  
    + For status other than these, hold the transaction and contact **SwiftPay** team.
    + Payment link expires in 30 minutes in production and sandbox.
:::


## Error Handling
The API may return the following status codes:
- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Transaction not found
- `500`: Server Error

Make sure to implement proper error handling in your code to handle these responses appropriately.

## Generic Errors

This document outlines the possible error responses you may encounter when using the SwiftPay API. All error responses follow a consistent format and include appropriate HTTP status codes.

### Error Response Format
```json
{
    "error": "Error message description",
    "code": 4XX
}
```

### Error Types

#### Environment Errors (400 Bad Request)
```json
{
    "error": "Invalid environment. Must be production or sandbox.",
    "code": 400
}
```
Occurs when the `x-swiftpay-environment` header value is neither 'production' nor 'sandbox'.

#### Authentication Errors (401 Unauthorized)

#### Invalid Token
```json
{
    "error": "Invalid or missing token.",
    "code": 401
}
```
Occurs when the provided `x-swiftpay-token` is invalid or missing.

#### Merchant Verification
```json
{
    "error": "Unverified Merchant",
    "code": 401
}
```
Occurs when the merchant's business status is not verified.

### Authorization Errors

#### Private Token Issues
```json
{
    "error": "User does not have the required private attribute.",
    "code": 403
}
```
```json
{
    "error": "Invalid private token.",
    "code": 403
}
```
Occurs during payment initiation when there are issues with the private token.

#### Public Token Issues
```json
{
    "error": "User does not have the required public attribute.",
    "code": 403
}
```
```json
{
    "error": "Invalid public token.",
    "code": 403
}
```

Occurs during payment verification when there are issues with the public token.
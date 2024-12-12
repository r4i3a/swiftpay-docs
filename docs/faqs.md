---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# FAQs and Gotchas

SwiftPay is a robust payment gateway that enables seamless web-based payment processing. This guide covers frequently asked questions and common gotchas to help you integrate SwiftPay into your application.

## General FAQs

### Integration & Setup
**Q: How long does the integration process take?**  
A: Basic integration typically takes 2-3 days. Complete testing and going live usually takes 1-2 weeks.

**Q: Can I test without a merchant account?**  
A: Yes, you can use our sandbox environment with test credentials before registration.

**Q: What happens if the payment fails?**  
A: You'll receive a webhook notification with the error details, and customers will be redirected to your `callback` URL.

### Transactions & Processing
**Q: What is the minimum/maximum transaction amount?**  
A: Minimum: NPR 10, Maximum: NPR 1,000,000 per transaction.

**Q: How do refunds work?**  
A: Refunds can be initiated within 30 days of the transaction through the dashboard or API.

**Q: How long do settlements take?**  
A: Settlements are processed every business day at 2 PM NPT.


## Base URL
```
https://pay.raisa.com.np
```

## Available Endpoints

| Endpoint | Method | Description |
|----------|---------|------------|
| `/api/v1/initiate` | POST | Initiate a new payment |
| `/api/v1/lookup` | POST | Check payment status |
| `api/v1/refund` | POST | Refund a payment |


## Authentication

### How do I authenticate requests?

All requests to SwiftPay require authentication using the `x-swiftpay-token` header:

<Tabs>
  <TabItem value="js" label="JavaScript" default>
```javascript
const headers = {
  'x-swiftpay-token': 'YOUR_SWIFTPAY_TOKEN',
  'x-swiftpay-environment': 'production'
};

const response = await fetch('https://pay.raisa.com.np/api/v1/initiate', {
  headers: headers,
  // ... other options
});
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

headers = {
    'x-swiftpay-token': 'YOUR_SWIFTPAY_TOKEN',
    'x-swiftpay-environment': 'production'
}

response = requests.post(
    'https://pay.raisa.com.np/api/v1/initiate', 
    headers=headers,
    # ... other options
)
```
  </TabItem>
  <TabItem value="dart" label="Dart">
```dart
final headers = {
  'x-swiftpay-token': 'YOUR_SWIFTPAY_TOKEN',
  'x-swiftpay-environment': 'production'
};

final response = await http.post(
  Uri.parse('https://pay.raisa.com.np/api/v1/initiate'),
  headers: headers,
  // ... other options
);
```
  </TabItem>
  <TabItem value="go" label="Go">
```go
headers := map[string]string{
    "x-swiftpay-token": "YOUR_SWIFTPAY_TOKEN",
    "x-swiftpay-environment": "production",
}

client := &http.Client{}
req, _ := http.NewRequest("POST", "https://pay.raisa.com.np/api/v1/initiate", nil)
for key, value := range headers {
    req.Header.Set(key, value)
}
```
  </TabItem>
  <TabItem value="php" label="PHP">
```php
$headers = [
    'x-swiftpay-token' => 'YOUR_SWIFTPAY_TOKEN',
    'x-swiftpay-environment' => 'production'
];

$response = Http::withHeaders($headers)
    ->post('https://pay.raisa.com.np/api/v1/initiate', [
        // ... other options
    ]);
```
  </TabItem>
</Tabs>

## Transaction Initiation

### How do I initiate a payment?

To initiate a payment, you need to provide:
- `callback`: URL where SwiftPay will send the payment result
- `domain`: Your website's domain
- `amount`: Payment amount (in Rupees)
- `transaction`: Your unique transaction identifier

<Tabs>
  <TabItem value="js" label="JavaScript" default>
```javascript
const payload = {
  callback: 'https://your-domain.com/callback',
  domain: 'https://your-domain.com',
  amount: 1000, // Amount in Rupees
  transaction: 'YOUR_UNIQUE_TRANSACTION_ID'
};

const response = await fetch('https://pay.raisa.com.np/api/v1/initiate', {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(payload)
});
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
payload = {
    'callback': 'https://your-domain.com/callback',
    'domain': 'https://your-domain.com',
    'amount': 1000,  # Amount in Rupees
    'transaction': 'YOUR_UNIQUE_TRANSACTION_ID'
}

response = requests.post(
    'https://pay.raisa.com.np/api/v1/initiate',
    headers=headers,
    json=payload
)
```
  </TabItem>
  <TabItem value="dart" label="Dart">
```dart
final payload = {
  'callback': 'https://your-domain.com/callback',
  'domain': 'https://your-domain.com',
  'amount': 1000, // Amount in Rupees
  'transaction': 'YOUR_UNIQUE_TRANSACTION_ID'
};

final response = await http.post(
  Uri.parse('https://pay.raisa.com.np/api/v1/initiate'),
  headers: headers,
  body: jsonEncode(payload)
);
```
  </TabItem>
  <TabItem value="go" label="Go">
```go
payload := map[string]interface{}{
    "callback": "https://your-domain.com/callback",
    "domain": "https://your-domain.com",
    "amount": 1000, // Amount in Rupees
    "transaction": "YOUR_UNIQUE_TRANSACTION_ID",
}

jsonData, _ := json.Marshal(payload)
req, _ := http.NewRequest(
    "POST", 
    "https://pay.raisa.com.np/api/v1/initiate", 
    bytes.NewBuffer(jsonData)
)
```
  </TabItem>
  <TabItem value="php" label="PHP">
```php
$payload = [
    'callback' => 'https://your-domain.com/callback',
    'domain' => 'https://your-domain.com',
    'amount' => 1000, // Amount in Rupees
    'transaction' => 'YOUR_UNIQUE_TRANSACTION_ID'
];

$response = Http::withHeaders($headers)
    ->post('https://pay.raisa.com.np/api/v1/initiate', $payload);
```
  </TabItem>
</Tabs>

## Transaction Lookup

### How do I check payment status?

You can look up a transaction using the `tnx` (transaction ID) returned from the initiation request:

<Tabs>
  <TabItem value="js" label="JavaScript" default>
```javascript
const response = await fetch('https://pay.raisa.com.np/api/v1/lookup', {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({ tnx: 'TRANSACTION_ID' })
});
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
response = requests.post(
    'https://pay.raisa.com.np/api/v1/lookup',
    headers=headers,
    json={'tnx': 'TRANSACTION_ID'}
)
```
  </TabItem>
  <TabItem value="dart" label="Dart">
```dart
final response = await http.post(
  Uri.parse('https://pay.raisa.com.np/api/v1/lookup'),
  headers: headers,
  body: jsonEncode({'tnx': 'TRANSACTION_ID'})
);
```
  </TabItem>
  <TabItem value="go" label="Go">
```go
payload := map[string]string{
    "tnx": "TRANSACTION_ID",
}

jsonData, _ := json.Marshal(payload)
req, _ := http.NewRequest(
    "POST", 
    "https://pay.raisa.com.np/api/v1/lookup", 
    bytes.NewBuffer(jsonData)
)
```
  </TabItem>
  <TabItem value="php" label="PHP">
```php
$response = Http::withHeaders($headers)
    ->post('https://pay.raisa.com.np/api/v1/lookup', [
        'tnx' => 'TRANSACTION_ID'
    ]);
```
  </TabItem>
</Tabs>

## Response Examples

### Successful Initiation Response
<Tabs>
  <TabItem value="success" label="Success" default>
```json
{
  "tnx": "SWIFTPAY-8AC2389A-ACF2-47A9-8D4B-CEA68E931DD8-EWP",
  "payment_url": "https://webpayment.pay.raisa.com.np/?tnx=SWIFTPAY-8AC2389A-ACF2-47A9-8D4B-CEA68E931DD8-EWP",
  "expires_at": "2024-11-18T15:30:00Z",
  "expires_in": 1800,
  "environment": "production"
}
```
  </TabItem>
  <TabItem value="error" label="Error">
```json
{
    "status": "error",
    "code": 422,
    "message": "Validation failed",
    "errors": {
        "callback": [
            "Callback URL is required",
            "Callback URL must be a valid URL"
        ],
        "domain": [
            "Domain URL is required",
            "Domain URL must be a valid URL"
        ],
        "amount": [
            "Amount is required",
            "Amount must be an integer in Rupee",
            "Amount must be greater than 0"
        ],
        "transaction": [
            "Transaction ID is required",
            "Transaction ID must be unique"
        ]
    }
}
```
  </TabItem>
</Tabs>

### Lookup Response
<Tabs>
  <TabItem value="success" label="Success" default>
```json
{
  "tnx": "SWIFTPAY-8AC2389A-ACF2-47A9-8D4B-CEA68E931DD8-EWP",
  "amount": 1000,
  "status": "completed",
  "transaction": "YOUR_TRANSACTION_ID",
  "environment": "production",
  "fee": 25,
  "refunded": false
}
```
  </TabItem>
  <TabItem value="error" label="Error">
```json
{
  "status": "error",
  "code": 404,
  "message": "Transaction not found.",
  "errors": {
    "tnx": ["The transaction ID provided does not match any records for this merchant."]
  }
}
```
  </TabItem>
</Tabs>

## Common Gotchas

### Domain and Callback URL Matching

:::warning
The hostname of your callback URL must match your domain URL. For example:
- ✅ Domain: `https://example.com`, Callback: `https://example.com/payment/callback`
- ❌ Domain: `https://example.com`, Callback: `https://api.example.com/callback`
:::

### Transaction Expiry

- Payment sessions expire after 30 minutes (1800 seconds)
- Always check the `expires_at` field in the initiation response
- Expired sessions cannot be reused and require a new initiation

### Status Codes

| Status Code | Meaning |
|------------|---------|
| 200 | Success |
| 400 | Invalid environment or failed transaction |
| 401 | Missing authentication token |
| 403 | Invalid merchant token |
| 404 | Merchant or transaction not found |
| 422 | Validation failed |
| 500 | Server error |

## Best Practices

1. **Environment Header**: Always specify the `x-swiftpay-environment` header
2. **Error Handling**: Implement proper error handling for all status codes
3. **Timeout Handling**: Set appropriate timeout values for API requests
4. **Unique Transaction IDs**: Generate unique transaction IDs for each payment
5. **URL Validation**: Ensure callback and domain URLs match and are valid
6. **Session Expiry**: Handle payment session expiration gracefully
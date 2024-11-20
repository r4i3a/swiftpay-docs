---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Web Checkout

This documentation details the process of implementing the latest e-Payment Checkout platform released by SwiftPay.

## Prerequisites

Before you begin, ensure you have:
- A SwiftPay merchant account
- Access to your SwiftPay Dashboard
- Your API credentials (SwiftPay Token)

## How it works?
- User visits the merchant's website to make some purchase
- A unique `transasction_id` is generated at merchant's system
- Payment request is made to SwiftPay providing the `transasction_id` as `transaction`, `amount` and `callback`
- User is redirected to the epayment portal (eg. https://webpayment.pay.raisa.com.np)
- After payment is made by the user, a successful callback is made to the `callback` URL
- The merchant website can optionally confirm the payment received
- The merchant website then proceeds other steps after payment confirmation

## Integration Steps


### Base URL
```
https://pay.raisa.com.np
```

### Initiate Endpoint

| URL | Method | Authorization | Format | 
| -- | -- | -- |  -- | 
api/v1/initiate |  POST | Required | application/json

### 1. Authentication

All API requests must include your SwiftPay token in the headers:

```http
x-swiftpay-token: YOUR_SWIFTPAY_TOKEN
x-swiftpay-environment: production
```

### 2. Initiating Payment

To start a payment transaction, make a POST request to our initiation endpoint.

**Endpoint:**
```
POST https://pay.raisa.com.np/api/v1/initiate
```

**Headers:**
```http
Content-Type: application/json
x-swiftpay-token: YOUR_SWIFTPAY_TOKEN
x-swiftpay-environment: production
```

**JSON Payload Details**

| Parameter    | Type   | Required | Description                                               |
|-------------|--------|----------|-----------------------------------------------------------|
| callback    | string | Yes      | URL where SwiftPay will send payment status notifications |
| domain      | string | Yes      | Your website's domain URL                                 |
| amount      | number | Yes      | Transaction amount (in NPR)                               |
| transaction | string | Yes      | Your unique transaction identifier                        |

**Sample Request Payload**
```json
{
    "callback": "https://yourwebsite.com/payment/callback",
    "domain": "https://yourwebsite.com",
    "amount": 1200,
    "transaction": "00RT89SR2CV"
}
```

### 3. Handling the Response

#### Successful Response

A successful request returns a payment URL and transaction details:

```json
{
    "tnx": "SWIFTPAY-A64666C5-1053-416F-9281-74042F58A060-EWP",
    "payment_url": "https://webpayment.pay.raisa.com.np?tnx=SWIFTPAY-A64666C5-1053-416F-9281-74042F58A060-EWP",
    "expires_at": "2024-11-20T08:03:28.000000Z",
    "expires_in": 1800,
    "environment": "production"
}
```

| Field        | Description                                            |
|--------------|--------------------------------------------------------|
| tnx          | Unique SwiftPay transaction identifier                  |
| payment_url  | URL to redirect customers for payment                   |
| expires_at   | Payment link expiration timestamp                       |
| expires_in   | Time until expiration in seconds                        |
| environment  | Current environment (production/sandbox)                |

#### Error Response

If the request is invalid, you'll receive an error response:

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
            "Amount is required"
        ],
        "transaction": [
            "Transaction ID is required"
        ]
    }
}
```

### 4. Implementation Samples


<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl --location 'https://pay.raisa.com.np/api/v1/initiate' \
--header 'x-swiftpay-token: SWIFTPAY-QZIGNIE7QMVRLSRSJ8FZONZNPVT' \
--header 'x-swiftpay-environment: production' \
--header 'Content-Type: application/json' \
--data '{
    "callback": "https://yourdomain.com/payment/callback",
    "domain": "https://yourdomain.com",
    "amount": 1200, 
    "transaction": "00RT89SR2CV"
}'
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const initiatePayment = async () => {
  try {
    const response = await fetch('https://pay.raisa.com.np/api/v1/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-swiftpay-token': 'SWIFTPAY-QZIGNIE7QMVRLSRSJ8FZONZNPVT',
        'x-swiftpay-environment': 'production',
      },
      body: JSON.stringify({
        callback: 'https://yourdomain.com/payment/callback',
        domain: 'https://yourdomain.com',
        amount: 1200,
        transaction: '00RT89SR2CV'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      // Redirect to payment page
      window.location.href = data.payment_url;
    } else {
      console.error('Payment initiation failed:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

def initiate_payment():
    url = "https://pay.raisa.com.np/api/v1/initiate"
    
    headers = {
        "Content-Type": "application/json",
        "x-swiftpay-token": "SWIFTPAY-QZIGNIE7QMVRLSRSJ8FZONZNPVT",
        "x-swiftpay-environment": "production",
    }
    
    payload = {
        "callback": "https://yourdomain.com/payment/callback",
        "domain": "https://yourdomain.com",
        "amount": 1200,
        "transaction": "00RT89SR2CV"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        return data["payment_url"]
        
    except requests.exceptions.RequestException as e:
        print(f"Error initiating payment: {e}")
        return None
```

</TabItem>
<TabItem value="golang" label="Go">

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

type PaymentRequest struct {
    Callback    string  `json:"callback"`
    Domain      string  `json:"domain"`
    Amount      float64 `json:"amount"`
    Transaction string  `json:"transaction"`
}

type PaymentResponse struct {
    Tnx        string `json:"tnx"`
    PaymentURL string `json:"payment_url"`
    ExpiresAt  string `json:"expires_at"`
    ExpiresIn  int    `json:"expires_in"`
}

func initiatePayment() (*PaymentResponse, error) {
    paymentReq := PaymentRequest{
        Callback:    "https://yourdomain.com/payment/callback",
        Domain:      "https://yourdomain.com",
        Amount:      1200,
        Transaction: "00RT89SR2CV",
    }
    
    jsonData, err := json.Marshal(paymentReq)
    if err != nil {
        return nil, err
    }
    
    req, err := http.NewRequest("POST", "https://pay.raisa.com.np/api/v1/initiate", 
        bytes.NewBuffer(jsonData))
    if err != nil {
        return nil, err
    }
    
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("x-swiftpay-token", "SWIFTPAY-QZIGNIE7QMVRLSRSJ8FZONZNPVT")
    req.Header.Set("x-swiftpay-environment", "production")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("unexpected status: %d", resp.StatusCode)
    }
    
    var paymentResp PaymentResponse
    if err := json.NewDecoder(resp.Body).Decode(&paymentResp); err != nil {
        return nil, err
    }
    
    return &paymentResp, nil
}
```

</TabItem>
<TabItem value="dart" label="Dart">

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class PaymentService {
  Future<String?> initiatePayment() async {
    final url = Uri.parse('https://pay.raisa.com.np/api/v1/initiate');
    
    final headers = {
      'Content-Type': 'application/json',
      'x-swiftpay-token': 'SWIFTPAY-QZIGNIE7QMVRLSRSJ8FZONZNPVT',
      'x-swiftpay-environment': 'production',
    };
    
    final payload = {
      'callback': 'https://yourdomain.com/payment/callback',
      'domain': 'https://yourdomain.com',
      'amount': 1200,
      'transaction': '00RT89SR2CV'
    };
    
    try {
      final response = await http.post(
        url,
        headers: headers,
        body: json.encode(payload),
      );
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return data['payment_url'];
      } else {
        throw Exception('Failed to initiate payment');
      }
    } catch (e) {
      print('Error initiating payment: $e');
      return null;
    }
  }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php

function initiatePayment() {
    $url = 'https://pay.raisa.com.np/api/v1/initiate';
    
    $headers = array(
        'Content-Type: application/json',
        'x-swiftpay-token: SWIFTPAY-QZIGNIE7QMVRLSRSJ8FZONZNPVT',
        'x-swiftpay-environment: production',
    );
    
    $payload = array(
        'callback' => 'https://yourdomain.com/payment/callback',
        'domain' => 'https://yourdomain.com',
        'amount' => 1200,
        'transaction' => '00RT89SR2CV'
    );
    
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    curl_close($ch);
    
    if ($httpcode === 200) {
        $data = json_decode($response, true);
        return $data['payment_url'];
    } else {
        error_log("Payment initiation failed: " . $response);
        return null;
    }
}

// Using with Laravel
public function initiatePaymentLaravel(Request $request)
{
    try {
        $response = Http::withHeaders([
            'x-swiftpay-token' => 'SWIFTPAY-QZIGNIE7QMVRLSRSJ8FZONZNPVT',
            'x-swiftpay-environment' => 'production',
        ])->post('https://pay.raisa.com.np/api/v1/initiate', [
            'callback' => 'https://yourdomain.com/payment/callback',
            'domain' => 'https://yourdomain.com',
            'amount' => 1200,
            'transaction' => '00RT89SR2CV'
        ]);
        
        if ($response->successful()) {
            return redirect($response['payment_url']);
        }
        
        return back()->with('error', 'Payment initiation failed');
        
    } catch (\Exception $e) {
        logger()->error('Payment initiation failed: ' . $e->getMessage());
        return back()->with('error', 'Unable to process payment');
    }
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

public class PaymentService
{
    private readonly HttpClient _httpClient;
    private const string ApiUrl = "https://pay.raisa.com.np/api/v1/initiate";
    
    public PaymentService()
    {
        _httpClient = new HttpClient();
        _httpClient.DefaultRequestHeaders.Add("x-swiftpay-token", "SWIFTPAY-QZIGNIE7QMVRLSRSJ8FZONZNPVT");
        _httpClient.DefaultRequestHeaders.Add("x-swiftpay-environment", "production");
    }
    
    public class PaymentRequest
    {
        public string Callback { get; set; }
        public string Domain { get; set; }
        public decimal Amount { get; set; }
        public string Transaction { get; set; }
    }
    
    public class PaymentResponse
    {
        public string Tnx { get; set; }
        public string PaymentUrl { get; set; }
        public string ExpiresAt { get; set; }
        public int ExpiresIn { get; set; }
    }
    
    public async Task<string> InitiatePaymentAsync()
    {
        try
        {
            var request = new PaymentRequest
            {
                Callback = "https://yourdomain.com/payment/callback",
                Domain = "https://yourdomain.com",
                Amount = 1200,
                Transaction = "00RT89SR2CV"
            };
            
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync(ApiUrl, content);
            response.EnsureSuccessStatusCode();
            
            var responseBody = await response.Content.ReadAsStringAsync();
            var paymentResponse = JsonSerializer.Deserialize<PaymentResponse>(responseBody);
            
            return paymentResponse?.PaymentUrl;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error initiating payment: {ex.Message}");
            return null;
        }
    }
}
```

</TabItem>
</Tabs>

### 5. Redirecting to Payment Page

After receiving a successful response:
1. Store the `tnx` value in your database (Optional)
2. Redirect the customer to the `payment_url`

You may redirect the customer to the `payment_url` using any appropriate method that aligns with your requirements.

#### Redirecting Reference  

<Tabs>
<TabItem value="javascript" label="JavaScript" default>
```javascript
const data = response.json();
if (response.ok) {
    // Redirect to payment page
    window.location.href = data.payment_url;
} else {
    console.error('Payment initiation failed:', data);
}
```
</TabItem>

<TabItem value="php" label="PHP">
```php
$response = json_decode($response, true);
if ($http_response_code == 200) {
    // Redirect to payment page
    header('Location: ' . $response['payment_url']);
    exit();
} else {
    error_log('Payment initiation failed: ' . print_r($response, true));
}
```
</TabItem>

<TabItem value="csharp" label="C#">
```csharp
var data = await response.Content.ReadFromJsonAsync<PaymentResponse>();
if (response.IsSuccessStatusCode)
{
    // Redirect to payment page
    Response.Redirect(data.PaymentUrl);
}
else
{
    _logger.LogError("Payment initiation failed: {Data}", data);
}
```
</TabItem>

<TabItem value="go" label="Go">
```go
var data map[string]interface{}
if err := json.NewDecoder(response.Body).Decode(&data); err != nil {
    log.Printf("Error decoding response: %v", err)
    return
}

if response.StatusCode == http.StatusOK {
    // Redirect to payment page
    http.Redirect(w, r, data["payment_url"].(string), http.StatusSeeOther)
} else {
    log.Printf("Payment initiation failed: %v", data)
}
```
</TabItem>
</Tabs>

### 6. Payment Callback

Once the payment is completed, SwiftPay will send a POST request to your callback URL with the payment status.

**Callback Parameters:**

| Parameter    | Description                                     |
|-------------|-------------------------------------------------|
| tnx         | SwiftPay transaction ID                         |
| status      | Payment status (success/failed)                 |
| amount      | Transaction amount                              |
| transaction | Your original transaction ID                    |
| message     | Additional information about the transaction  (Optional)    |


#### Sample Callback Request

<Tabs>
  <TabItem value="success" label="Success" default>
    ```bash
https://yourwebsite.com/payment/callback?tnx=SWIFTPAY-A64666C5-1053-416F-9281-74042F58A060-EWP
&status=completed
&amount=1200
&transaction=00RT89SR2CV
```
  </TabItem>
  <TabItem value="canceled" label="Canceled">
    ```bash
https://yourwebsite.com/payment/callback?tnx=SWIFTPAY-A64666C5-1053-416F-9281-74042F58A060-EWP
&status=failed
&amount=1200
&transaction=00RT89SR2CV
```
  </TabItem>
</Tabs>

:::info Important
    - Please use the lookup API for the final validation of the transaction.
    - SwiftPay payment link expires in 30 minutes in production and sandbox (default).
:::   

:::warning Configuration
- The callback url `callback` URL should support `GET` method
- User shall be redirected to the `callback` URL with following parameters for confirmation
:::


## Testing

1. Use the sandbox environment for testing:
```http
x-swiftpay-environment: sandbox
```

2. Test different scenarios:
   - Successful payment
   - Failed payment
   - Expired payment link
   - Invalid parameters

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

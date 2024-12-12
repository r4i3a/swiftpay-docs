---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started

This document serves as a comprehensive guide to integrating the SwiftPay Payment Gateway (SPG) into your system. The integration process involves signing up as a merchant, understanding the integration methods for web and mobile, and transitioning to a live environment after successful testing.



- [1. Signup as a Merchant in SwiftPay](#1-signup-as-a-merchant-in-swiftpay)
- [2. ePayment Gateway Integration](#2-epayment-gateway-integration) 
	- [2.1. Web](#21-web-checkout)
	- [2.2. Mobile](#22-mobile-checkout) 
- [3. Test Environment](#3-test-environment)
- [4. Going Live](#4-going-live)


## 1. Signup as a Merchant in SwiftPay

Before proceeding with the integration, it's essential to understand the terms used throughout the documentation:

- **Merchant :** Online business services such as e-commerce websites, ISP online payment portals, or online movie ticket platforms seeking to receive online payments via SPG.


If you're new to SwiftPay Payment Gateway service, familiarize yourself with its offerings by reading [here](./intro)  for a better understanding.

To initiate the integration process, sign up  as a merchant account :


- [Create a merchant account](https://pay.raisa.com.np/merchant)



## 2. ePayment Gateway Integration 
The integration process varies depending on whether you're integrating SPG on a web or mobile platform. Follow the steps outlined below accordingly:

### 2.1. Web Checkout
The payment process flow of SPG Web Checkout is as follows:

- Merchant requests SwiftPay to initiate the online payment.
- SwiftPay system returns with `tnx`, `payment_url`, `expires_at`, `expires_in` and `environment`.
- The user must be redirected to `payment_url`.
- After payment, callback is received from SwiftPay system.
- Merchant side must hit the lookup API to get the status of the transaction.

If you are looking to integrate SPG on web application, then the integration must be done by integrating the web checkout. Please follow the documentation here to proceed Web Checkout.

Checkout provides all the necessary Uls and perform necessary processes to initiate and confirm the payment.

### 2.2. Mobile Checkout

The payment process flow of SPG SDK (Android & Flutter) is as follows:

- Merchant requests SwiftPay to initiate the online payment.
- SwiftPay system returns with `tnx`, `payment_url`, `expires_at`, `expires_in` and `environment`.

Merchant side must hit the lookup API to get the status of the transaction.

:::note
Mobile Checkout integration is coming soon. Stay tuned for updates!
:::


## 3. Test Environment

Use our sandbox environment to test your SwiftPay integration before going live. The sandbox environment provides a safe testing space that mimics production behavior without processing real transactions.

Get your sandbox credentials from the SwiftPay Developer Dashboard and configure your headers as follows:

<Tabs groupId="language">
  <TabItem value="curl" label="Curl">
  ```bash
  curl --location 'https://pay.raisa.com.np/api/v1/initiate' \
    --header 'x-swiftpay-token: YOUR-PRIVATE-TOKEN' \  
    --header 'x-swiftpay-environment: sandbox'       
  ```
  </TabItem>

  <TabItem value="js" label="Js">
    ```js    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://pay.raisa.com.np/api/v1/initiate',
      headers: { 
        'x-swiftpay-token': 'YOUR-PRIVATE-TOKEN', 
        'x-swiftpay-environment': 'sandbox',   
      },
    };
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```py    
    headers: { 
      'x-swiftpay-token': 'YOUR-PRIVATE-TOKEN',
      'x-swiftpay-environment': 'sandbox',  
    },  
    ```
  </TabItem>
  <TabItem value="dart" label="Dart">
    ```dart
    var headers: { 
      'x-swiftpay-token': 'YOUR-PRIVATE-TOKEN',
      'x-swiftpay-environment': 'sandbox',  
    },
    ```
  </TabItem>
  <TabItem value="php" label="Php">
    ```PHp
    $headers = [
        'x-swiftpay-token' => 'YOUR-PRIVATE-TOKEN', 
        'x-swiftpay-environment' => 'sandbox'    
    ];
    ```
  </TabItem>
</Tabs>

## 4. Going Live

Before deploying your SwiftPay integration to production, ensure you've completed the required steps in the correct order. Start by thoroughly testing your integration in the sandbox environment to verify all payment flows, error handling, and webhook integrations work as expected. Once testing is complete, submit your integration for our technical review team to verify your implementation.

After approval, you'll receive your production credentials. When implementing these credentials, ensure you update both your API token and environment settings:

<Tabs groupId="language">
  <TabItem value="curl" label="Curl">
  ```bash
  # Update these settings in your production environment
  curl --location 'https://pay.raisa.com.np/api/v1/initiate' \
    --header 'x-swiftpay-token: YOUR-PRIVATE-TOKEN' \    # Replace sandbox token with production
    --header 'x-swiftpay-environment: production'        # Change from 'sandbox' to 'production'
  ```
  </TabItem>

  <TabItem value="js" label="Js">
    ```js    
    // Update these settings in your production environment
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://pay.raisa.com.np/api/v1/initiate',
      headers: { 
        'x-swiftpay-token': 'YOUR-PRIVATE-TOKEN', // Replace sandbox token with production
        'x-swiftpay-environment': 'production',   // Change from 'sandbox' to 'production'
      },
    };
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```py
    # Update these settings in your production environment
    headers: { 
      'x-swiftpay-token': 'YOUR-PRIVATE-TOKEN', # Replace sandbox token with production
      'x-swiftpay-environment': 'production',   # Change from 'sandbox' to 'production'
    },  
    ```
  </TabItem>
  <TabItem value="dart" label="Dart">
    ```dart
    // Update these settings in your production environment
    var headers: { 
      'x-swiftpay-token': 'YOUR-PRIVATE-TOKEN', // Replace sandbox token with production
      'x-swiftpay-environment': 'production',   // Change from 'sandbox' to 'production'
    },
    ```
  </TabItem>
  <TabItem value="php" label="Php">
    ```PHp
    // Update these settings in your production environment
    $headers = [
        'x-swiftpay-token' => 'YOUR-PRIVATE-TOKEN',  // Replace sandbox token with production token
        'x-swiftpay-environment' => 'production'     // Change from 'sandbox' to 'production'
    ];
    ```
  </TabItem>
</Tabs>

Finally, perform at least one test transaction in production to verify your live integration is working correctly. This helps ensure a smooth transition for your customers.

:::info "Access Information"
   **For Production** <br />Signup from [here](https://pay.raisa.com.np/merchant) as a merchant.<br />    
   **URL :** https://pay.raisa.com.np <br /> 
   **Server Side Authorization Key :** Private key <br />
   **Client Side Authorization Key :** Public key  
::: 


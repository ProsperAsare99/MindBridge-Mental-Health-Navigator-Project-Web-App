# Fixing Google Redirect URI Mismatch

The error `Error 400: redirect_uri_mismatch` happens because Google needs to know exactly where it's allowed to send users back to after they log in.

### Step-by-Step Fix:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Click on the **OAuth 2.0 Client ID** you created (the one named "MindBridge" or similar).
3. Scroll down to the **Authorized redirect URIs** section.
4. Click **Add URI**.
5. Paste this exact link:
   `http://localhost:3000/api/auth/callback/google`
6. Click **Save** at the bottom.

### Important:
- It can take 2-5 minutes for Google's servers to update after you click Save.
- Once saved, try clicking the Google Login button again!

> [!NOTE]
> If you ever deploy your site to a real domain (like `mindbridge.com`), you will need to add `https://mindbridge.com/api/auth/callback/google` to this same list.

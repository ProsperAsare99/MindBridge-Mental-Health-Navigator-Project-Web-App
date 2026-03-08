# How to Setup Real Email (Gmail + App Password)

To send emails directly to users using your Gmail account, follow these steps:

### 1. Enable 2-Step Verification
Gmail requires 2-Step Verification to be ON to create an "App Password".
1. Go to your [Google Account](https://myaccount.google.com/).
2. Select **Security** on the left panel.
3. Under "How you sign in to Google," make sure **2-Step Verification** is turned **ON**.

### 2. Generate an App Password
1. In the **Security** tab, click on **2-Step Verification**.
2. Scroll to the very bottom and click on **App passwords**.
3. **App name**: Enter "MindBridge" or any name you like.
4. Click **Create**.
5. Google will show you a **16-character password** (e.g., `abcd efgh ijkl mnop`). **Copy this immediately.**

### 3. Update your `.env` File
Open your `server/.env` file and update or add these lines:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM_NAME=MindBridge Navigator
FRONTEND_URL=http://localhost:3000
```

> [!IMPORTANT]
> Remove any spaces from the 16-character App Password when pasting it into `EMAIL_PASS`.

### 4. Restart the Server
After saving the `.env` file, restart your backend server to apply the changes.
- Kill the current terminal running `npm run dev` in the `server` folder.
- Run `npm run dev` again.

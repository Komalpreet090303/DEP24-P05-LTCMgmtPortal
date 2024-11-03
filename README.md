This project has been tested on Arch Linux and Windows 11.

Setup Backend:

Optionally create new virtual environment by using python3 -m pip venv .venv && source .venv/bin/activate

1. Go to script.google.com and create a new script and copy content from app-scripts/otp.gs and deploy the script. Copy the url of deployed function.
2. Go to script.google.com and create a new script and copy content from app-scripts/reminder.gs and deploy the script. Copy the url of deployed function.
3. pip install -r requirements.txt
4. Create env.py file with format:

OTP_URL='[URL OBTAINED FOR T1]'
REMINDER_URL='[URL OBTAINED FOR T2]'

5. python3 app.py

Given below are the few key pages in the flow of the application

This is the landing page for the LTC/TA applicant, providing the details to navigate and the key features
![WhatsApp Image 2024-11-03 at 3 05 00 PM](https://github.com/user-attachments/assets/a1740597-a7ef-42cd-b4e2-f659672ffc5a)
![WhatsApp Image 2024-11-03 at 3 05 00 PM (1)](https://github.com/user-attachments/assets/f28cbee2-82a9-455d-8e90-56115f5f1c98)

This is the LTC Application Form page
![WhatsApp Image 2024-11-03 at 3 05 00 PM (2)](https://github.com/user-attachments/assets/3c6a2d7e-346b-48de-a10a-eb625bc50828)

This is the Dashboard for the Applicant to view the applications and the status as well as comments recieved
![WhatsApp Image 2024-11-03 at 3 05 00 PM (3)](https://github.com/user-attachments/assets/40848e41-1158-45fb-9c15-4bb6559551ed)

This is the download PDF feature to print the application at any stage 
![WhatsApp Image 2024-11-03 at 3 05 00 PM (4)](https://github.com/user-attachments/assets/68143c8d-325c-4702-b151-2c3b55ed5901)

This is the Admin dashboard with the Search functionality for Users by Role and Name
![WhatsApp Image 2024-11-03 at 3 05 00 PM (5)](https://github.com/user-attachments/assets/8a3f0a15-103f-4eca-852d-4f87b4d0c48e)

This is the Admin functionality to Add Users via CSV files or direct update
![WhatsApp Image 2024-11-03 at 3 05 00 PM (6)](https://github.com/user-attachments/assets/7bade05a-8c69-4c00-aa37-14d50bdc1893)

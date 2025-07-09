// emailTemplates.js

export const departmentWelcomeTemplate = (name, deptId, password) => {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #2e6da4;">🏢 Welcome to the Department System, ${name}!</h2>
        <p>You have been successfully registered as a <strong>Department</strong> in our complaint management system.</p>
        <p>Here are your login credentials:</p>
        <ul style="line-height: 1.6;">
          <li><strong>Department ID:</strong> ${deptId}</li>
          <li><strong>Password:</strong> ${password}</li>
        </ul>
        <p>You can use these credentials to log in and manage complaints assigned to your department.</p>
        <p style="color: red;"><strong>Note:</strong> Please change your password after the first login for security.</p>
        <br />
        <p>Regards,<br /><strong>Admin Team</strong></p>
      </div>
    `;
  };
  
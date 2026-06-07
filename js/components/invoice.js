// ========================================
// DriveEase — Invoice Generator Component
// ========================================

function generateInvoiceHTML(invoiceNo, carName, baseFare, gst, total, date) {
  const user = AppState.currentUser || { name: 'Customer', email: 'customer@email.com', phone: '' };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Invoice ${invoiceNo} - DriveEase</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; padding: 40px; background: #f8fafc; color: #1e293b; }
    .invoice { max-width: 700px; margin: 0 auto; background: white; border-radius: 12px; padding: 48px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 24px; border-bottom: 2px solid #e2e8f0; }
    .logo { font-size: 24px; font-weight: 800; color: #3b82f6; }
    .logo span { color: #1e293b; }
    .invoice-badge { background: #3b82f6; color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
    .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
    .meta-group h4 { color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; }
    .meta-group p { font-size: 14px; line-height: 1.6; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th { background: #f1f5f9; padding: 12px 16px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 700; }
    td { padding: 14px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .total-row td { font-weight: 800; font-size: 16px; border-top: 2px solid #e2e8f0; background: #f8fafc; color: #3b82f6; }
    .footer { text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px; }
    .stamp { display: inline-block; padding: 8px 24px; border: 2px solid #10b981; color: #10b981; border-radius: 6px; font-weight: 700; font-size: 14px; transform: rotate(-5deg); margin-top: 16px; }
    @media print { body { padding: 0; background: white; } .invoice { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="invoice">
    <div class="header">
      <div>
        <div class="logo">🚗 <span>Drive</span>Ease</div>
        <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Self-Drive Car Rental</p>
      </div>
      <div style="text-align: right;">
        <span class="invoice-badge">Invoice</span>
        <p style="margin-top: 8px; font-weight: 700; font-size: 14px;">${invoiceNo}</p>
        <p style="color: #94a3b8; font-size: 13px;">Date: ${date}</p>
      </div>
    </div>

    <div class="meta">
      <div class="meta-group">
        <h4>Billed To</h4>
        <p><strong>${user.name}</strong><br>${user.email}<br>${user.phone || '+91 XXXXX XXXXX'}</p>
      </div>
      <div class="meta-group">
        <h4>Company</h4>
        <p><strong>DriveEase Technologies Pvt. Ltd.</strong><br>123 MG Road, Bangalore 560001<br>GSTIN: 29ABCDE1234F1Z5</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>HSN/SAC</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${carName.replace(/[^a-zA-Z0-9 ]/g, '')} - Self Drive Rental</td>
          <td>996601</td>
          <td style="text-align: right;">₹${baseFare > 0 ? baseFare.toLocaleString() : (Math.round(total / 1.18)).toLocaleString()}</td>
        </tr>
        <tr>
          <td>CGST @ 9%</td>
          <td>-</td>
          <td style="text-align: right;">₹${gst > 0 ? Math.round(gst / 2).toLocaleString() : Math.round((total - total / 1.18) / 2).toLocaleString()}</td>
        </tr>
        <tr>
          <td>SGST @ 9%</td>
          <td>-</td>
          <td style="text-align: right;">₹${gst > 0 ? (gst - Math.round(gst / 2)).toLocaleString() : (Math.round(total - total / 1.18) - Math.round((total - total / 1.18) / 2)).toLocaleString()}</td>
        </tr>
        <tr class="total-row">
          <td colspan="2">Total Amount</td>
          <td style="text-align: right;">₹${total > 0 ? total.toLocaleString() : '0'}</td>
        </tr>
      </tbody>
    </table>

    <div style="text-align: center;">
      <div class="stamp">✓ PAID</div>
    </div>

    <div class="footer">
      <p>Thank you for choosing DriveEase!</p>
      <p style="margin-top: 8px;">This is a computer-generated invoice and does not require a physical signature.</p>
      <p style="margin-top: 4px;">For queries, contact support@driveease.com | +91 1800-DRIVE-00</p>
    </div>
  </div>
</body>
</html>`;
}

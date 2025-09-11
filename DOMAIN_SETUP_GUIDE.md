# 🌐 Custom Domain Setup Guide for djenepocouture.com

## Step-by-Step Instructions to Connect Your Domain

### 📋 **Phase 1: Vercel Domain Configuration**

#### 1. **Add Custom Domain in Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click on your `Djenepocouture` project
   - Go to "Settings" tab
   - Click "Domains" in the left sidebar
   - Click "Add" button
   - Enter: `djenepocouture.com`
   - Click "Add Domain"

#### 2. **Add www Subdomain (Recommended)**
   - In the same Domains section
   - Click "Add" again
   - Enter: `www.djenepocouture.com`
   - Set it to redirect to `djenepocouture.com`

### 📋 **Phase 2: DNS Configuration**

#### 3. **Configure DNS Records**
   **If using a domain registrar (like GoDaddy, Namecheap, etc.):**
   
   Add these DNS records in your domain registrar's control panel:
   
   ```
   Type: A
   Name: @
   Value: 76.76.19.61
   TTL: 3600
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

   **If using Cloudflare:**
   ```
   Type: A
   Name: @
   Value: 76.76.19.61
   Proxy: Enabled (orange cloud)
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   Proxy: Enabled (orange cloud)
   ```

#### 4. **Wait for DNS Propagation**
   - DNS changes can take 24-48 hours to fully propagate
   - You can check status at: https://dnschecker.org/
   - Enter `djenepocouture.com` to see propagation status

### 📋 **Phase 3: SSL Certificate**

#### 5. **Enable HTTPS**
   - Vercel will automatically generate SSL certificates
   - This happens automatically once DNS is configured
   - Look for green "Valid" status in Vercel Domains section

### 📋 **Phase 4: Verification**

#### 6. **Test Your Domain**
   Test these URLs to ensure everything works:
   - ✅ `https://djenepocouture.com`
   - ✅ `https://www.djenepocouture.com` (should redirect)
   - ✅ `http://djenepocouture.com` (should redirect to HTTPS)
   - ✅ `https://djenepocouture.com/products`
   - ✅ `https://djenepocouture.com/contact`

---

## 🔧 **Troubleshooting**

### **Common Issues:**

#### **Domain Not Working**
- Check DNS records are correct
- Wait for DNS propagation (24-48 hours)
- Clear browser cache and try incognito mode

#### **SSL Certificate Issues**
- Wait for automatic certificate generation
- Check that DNS records point to Vercel
- Contact Vercel support if issues persist

#### **Redirect Loops**
- Ensure DNS records match exactly as shown above
- Check Cloudflare proxy settings if using Cloudflare

---

## 📊 **Current Configuration Status**

### ✅ **Completed (Ready for Domain)**
- [x] Updated sitemap.xml with djenepocouture.com
- [x] Updated robots.txt with correct domain
- [x] Added domain redirects from Vercel subdomain
- [x] Updated all SEO meta tags
- [x] Updated Google indexing guide

### 🔄 **Manual Steps Required**
- [ ] Add domain in Vercel dashboard
- [ ] Configure DNS records at domain registrar
- [ ] Wait for DNS propagation
- [ ] Verify SSL certificate activation
- [ ] Test all website pages

---

## 📞 **Support Resources**

1. **Vercel Documentation**: https://vercel.com/docs/concepts/projects/domains
2. **DNS Checker**: https://dnschecker.org/
3. **SSL Checker**: https://www.ssllabs.com/ssltest/

---

## 🎯 **Expected Timeline**

| Step | Timeline |
|------|----------|
| Add domain in Vercel | 2 minutes |
| Configure DNS records | 5 minutes |
| DNS propagation | 24-48 hours |
| SSL certificate | Automatic after DNS |
| Full functionality | 48-72 hours |

Once DNS propagation is complete, your website will be accessible at `https://djenepocouture.com`!

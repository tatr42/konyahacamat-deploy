# EbPanel sifre testi - degeri .env.local'den okur, canli siteye dener
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$envFile = Join-Path $PSScriptRoot ".env.local"
$line = Get-Content $envFile | Select-String '^ADMIN_PASSWORD='
if (-not $line) { Write-Host "HATA: .env.local icinde ADMIN_PASSWORD bulunamadi"; exit 1 }
$pw = $line.ToString().Split('=', 2)[1].Trim().Trim('"')
Write-Host ("Test edilen sifre uzunlugu: " + $pw.Length + " karakter")
$body = @{ password = $pw } | ConvertTo-Json
try {
    $r = Invoke-RestMethod -Uri "https://www.konyahacamat.net/api/admin/login" -Method Post -ContentType "application/json" -Body $body
    Write-Host ""
    Write-Host "SONUC: GIRIS BASARILI" -ForegroundColor Green
    Write-Host "Vercel'deki sifre dogru. Tarayicidan giris yapabilirsiniz."
} catch {
    Write-Host ""
    $resp = $_.Exception.Response
    if ($resp) {
        $code = [int]$resp.StatusCode
        Write-Host ("SONUC: BASARISIZ - HTTP kodu: " + $code) -ForegroundColor Red
        if ($code -eq 401) { Write-Host "401 = sifre gercekten eslesmiyor." }
        else { Write-Host "401 DEGIL = sorun sifre olmayabilir, kodu Claude'a iletin." }
    } else {
        Write-Host "SONUC: BAGLANTI HATASI (sifreyle ilgili degil!)" -ForegroundColor Yellow
        Write-Host ("Detay: " + $_.Exception.Message)
    }
}

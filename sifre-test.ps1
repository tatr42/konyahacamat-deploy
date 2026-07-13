# EbPanel sifre testi - degeri .env.local'den okur, canli siteye dener
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
    Write-Host "Vercel'deki sifre .env.local ile AYNI. Sorun giris sayfasina yazilan degerde."
} catch {
    Write-Host ""
    Write-Host "SONUC: HATALI SIFRE" -ForegroundColor Red
    Write-Host "Vercel'deki deger .env.local'dekinden FARKLI. Yeniden eklemek gerekiyor."
}

# EbPanel sifre guncelleme - degeri .env.local'den okur, Vercel'e aktarir
$envFile = Join-Path $PSScriptRoot ".env.local"
$line = Get-Content $envFile | Select-String '^ADMIN_PASSWORD='
if (-not $line) { Write-Host "HATA: .env.local icinde ADMIN_PASSWORD bulunamadi"; exit 1 }
$pw = $line.ToString().Split('=', 2)[1].Trim().Trim('"')
Write-Host ("Aktarilacak sifre uzunlugu: " + $pw.Length + " karakter (14 olmali)")

Write-Host ""
Write-Host "1/2 - Eski deger siliniyor (yoksa hata mesaji normaldir)..."
npx vercel env rm ADMIN_PASSWORD production -y

Write-Host ""
Write-Host "2/2 - Yeni deger ekleniyor..."
$pw | npx vercel env add ADMIN_PASSWORD production --sensitive

Write-Host ""
Write-Host "BITTI. Simdi Claude'a 'tamam' yazin - redeploy yapilacak."

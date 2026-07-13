# EbPanel sifre guncelleme - degeri .env.local'den okur, Vercel'e aktarir
# (deger gecici dosyaya satir sonu OLMADAN yazilir, oradan stdin ile verilir)
Set-Location $PSScriptRoot
$envFile = Join-Path $PSScriptRoot ".env.local"
$line = Get-Content $envFile | Select-String '^ADMIN_PASSWORD='
if (-not $line) { Write-Host "HATA: .env.local icinde ADMIN_PASSWORD bulunamadi"; exit 1 }
$pw = $line.ToString().Split('=', 2)[1].Trim().Trim('"')
Write-Host ("Aktarilacak sifre uzunlugu: " + $pw.Length + " karakter (14 olmali)")

$tmp = Join-Path $PSScriptRoot "pw.tmp"
[System.IO.File]::WriteAllText($tmp, $pw)

Write-Host ""
Write-Host "1/2 - Eski deger siliniyor (yoksa hata mesaji normaldir)..."
cmd /c "npx vercel env rm ADMIN_PASSWORD production -y"

Write-Host ""
Write-Host "2/2 - Yeni deger ekleniyor (dosyadan, satir sonu yok)..."
cmd /c "npx vercel env add ADMIN_PASSWORD production --sensitive < `"$tmp`""

Remove-Item $tmp -Force
Write-Host ""
Write-Host "BITTI. 'WARNING! Value contains newlines' YAZMAMIS olmali."
Write-Host "Simdi Claude'a 'tamam' yazin - redeploy yapilacak."

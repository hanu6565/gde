# =============================================================================
# 🚀 Geumdeungeo High-Performance Local PowerShell Web Server
# Serves 금등어 Main Homepage and Admin CRM/CMS Portal
# =============================================================================

$Port = 5173
$Root = $PSScriptRoot

# Set UTF-8 Console Output
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$Listener = New-Object System.Net.HttpListener
$Listener.Prefixes.Add("http://localhost:$Port/")
$Listener.Prefixes.Add("http://127.0.0.1:$Port/")

try {
    $Listener.Start()
    Write-Host "==========================================================" -ForegroundColor DarkYellow
    Write-Host "  ✨ [금등어] 프리미엄 로컬 웹 서버 가동 완료!" -ForegroundColor Green
    Write-Host "  🌐 메인 홈페이지: http://localhost:$Port/" -ForegroundColor Cyan
    Write-Host "  🛡️ 관리자 페이지: http://localhost:$Port/#admin" -ForegroundColor Cyan
    Write-Host "  ⚡ 루트 디렉토리: $Root" -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor DarkYellow
} catch {
    Write-Host "❌ 서버 시작 실패: $_" -ForegroundColor Red
    exit 1
}

$MimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".jsx"  = "text/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".mp4"  = "video/mp4"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

while ($Listener.IsListening) {
    try {
        $Context = $Listener.GetContext()
        $Request = $Context.Request
        $Response = $Context.Response

        $UrlPath = [System.Uri]::UnescapeDataString($Request.Url.AbsolutePath)
        if ($UrlPath -eq "/" -or [string]::IsNullOrWhiteSpace($UrlPath)) {
            $UrlPath = "/index.html"
        }

        # Normalize relative path
        $RelPath = $UrlPath.TrimStart("/\").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
        $FilePath = [System.IO.Path]::Combine($Root, $RelPath)

        # SPA fallback to index.html if file does not exist and no extension
        if (-not (Test-Path -Path $FilePath -PathType Leaf) -and -not [System.IO.Path]::HasExtension($FilePath)) {
            $FilePath = [System.IO.Path]::Combine($Root, "index.html")
        }

        if (Test-Path -Path $FilePath -PathType Leaf) {
            $Ext = [System.IO.Path]::GetExtension($FilePath).ToLowerInvariant()
            $ContentType = if ($MimeTypes.ContainsKey($Ext)) { $MimeTypes[$Ext] } else { "application/octet-stream" }
            $Response.ContentType = $ContentType

            # Performance Caching Headers
            if ($Ext -in @(".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico", ".woff", ".woff2")) {
                $Response.Headers.Add("Cache-Control", "public, max-age=86400")
            } else {
                $Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
            }

            # Add CORS & Security Headers
            $Response.Headers.Add("Access-Control-Allow-Origin", "*")
            $Response.Headers.Add("X-Content-Type-Options", "nosniff")

            $Bytes = [System.IO.File]::ReadAllBytes($FilePath)
            $Response.ContentLength64 = $Bytes.Length
            $Response.StatusCode = 200
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
        } else {
            $Response.StatusCode = 404
            $Response.ContentType = "text/plain; charset=utf-8"
            $NotFoundBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $Response.ContentLength64 = $NotFoundBytes.Length
            $Response.OutputStream.Write($NotFoundBytes, 0, $NotFoundBytes.Length)
        }
    } catch {
        # Catch closed listener or cancelled requests
    } finally {
        if ($Response) {
            try { $Response.OutputStream.Close() } catch {}
            try { $Response.Close() } catch {}
        }
    }
}

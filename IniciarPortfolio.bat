@echo off
cd /d "%~dp0"
set "PORTFOLIO_HUGO=hugo"
where hugo >nul 2>nul
if errorlevel 1 (
  if exist "C:\hugo\hugo.exe" (
    set "PORTFOLIO_HUGO=C:\hugo\hugo.exe"
  ) else (
    echo No se encontro Hugo. Instala Hugo 0.163.0 o posterior.
    pause
    exit /b 1
  )
)
echo.
echo Abri http://localhost:1313/ en tu navegador.
echo Manten esta ventana abierta. Ctrl+C detiene la vista previa.
echo.
"%PORTFOLIO_HUGO%" server --bind 127.0.0.1 --port 1313 --baseURL http://localhost:1313/ --disableFastRender
if errorlevel 1 pause

@echo off
chcp 65001 > nul
title 📚 Sistema Livraria - FUNCIONANDO 100%

:menu
cls
echo ==================================================
echo          📚 SISTEMA DE LIVRARIA
echo ==================================================
echo  1 - Iniciar BACKEND (Porta 8083)
echo  2 - Iniciar FRONTEND (Porta 5173)
echo  3 - Iniciar AMBOS
echo  4 - Sair
echo ==================================================
set /p op=Escolha: 

:: BACKEND
if "%op%"=="1" (
    cd /d "C:\Users\Alunos\SistemaLivrariaB\backend"
    echo 🚀 Iniciando Backend...
    "C:\Users\Alunos\SistemaLivrariaB\backend\maven\apache-maven-3.9.9\bin\mvn.cmd" spring-boot:run
    pause
    goto menu
)

:: FRONTEND
if "%op%"=="2" (
    cd /d "C:\Users\Alunos\SistemaLivrariaB"
    echo ⚛️ Iniciando Frontend...
    npm run dev
    pause
    goto menu
)

:: AMBOS
if "%op%"=="3" (
    echo 🚀 Abrindo os dois...
    start "BACKEND" cmd /k "cd /d C:\Users\Alunos\SistemaLivrariaB\backend && C:\Users\Alunos\SistemaLivrariaB\backend\maven\apache-maven-3.9.9\bin\mvn.cmd spring-boot:run"
    timeout /t 5 /nobreak >nul
    start "FRONTEND" cmd /k "cd /d C:\Users\Alunos\SistemaLivrariaB && npm run dev"
    echo ✅ Ambos abertos!
    pause
    goto menu
)

if "%op%"=="4" exit
goto menu
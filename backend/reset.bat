@REM @echo off
@REM echo ============================================
@REM echo  RESET COMPLET DE LA BASE DE DONNEES DJANGO
@REM echo ============================================

@REM if exist db.sqlite3 (
@REM     del db.sqlite3
@REM     echo  Base de donnees supprimee
@REM ) else (
@REM     echo Pas de fichier db.sqlite3 trouve
@REM )

@REM echo  Suppression des fichiers de migrations...
@REM for /d %%i in (*) do (
@REM     if exist "%%i\migrations" (
@REM         del /q "%%i\migrations\0*.py" >nul 2>&1
@REM     )
@REM )

@REM echo  Regeneration des migrations...
@REM call venv\Scripts\activate
@REM python manage.py makemigrations

@REM python manage.py migrate

@REM set /p CREATE_SUPERUSER="Voulez-vous creer un superutilisateur ? (y/n): "
@REM if /i "%CREATE_SUPERUSER%"=="y" (
@REM     python manage.py createsuperuser
@REM )

@REM echo Your project is clean and ready to use!
@REM pause

echo python manage.py flush
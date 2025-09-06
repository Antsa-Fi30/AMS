@echo off
echo ============================================
echo  RESET COMPLET DE LA BASE DE DONNEES DJANGO
echo ============================================

if exist db.sqlite3 (
    del db.sqlite3
    echo  Base de donnees supprimee
) else (
    echo Pas de fichier db.sqlite3 trouve
)

echo  Suppression des fichiers de migrations...
for /d %%i in (*) do (
    if exist "%%i\migrations" (
        del /q "%%i\migrations\0*.py" >nul 2>&1
    )
)

echo  Regeneration des migrations...
call venv\Scripts\activate
python manage.py makemigrations

python manage.py migrate

set /p CREATE_SUPERUSER="Voulez-vous creer un superutilisateur ? (y/n): "
if /i "%CREATE_SUPERUSER%"=="y" (
    python manage.py createsuperuser
)

echo Your project is clean and ready to use!
pause

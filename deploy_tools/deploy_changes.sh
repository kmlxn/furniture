project_container_dir="$(pwd)/../../"

../venv/bin/python manage.py migrate
../venv/bin/python manage.py collectstatic --noinput


sudo service site-furniture restart
sudo service nginx restart

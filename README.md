# Portafolio de Agustín González

Sitio estático bilingüe (español / inglés), construido con Hugo 0.163.0. No necesita Node.js, npm, Go ni instalar el tema anterior para ejecutarse.

## Verlo localmente en Windows

En `C:\Users\Agustin\Documents\CV`, abrí `IniciarPortfolio.bat` con doble clic. Después entrá a <http://localhost:1313/>. Dejá la consola abierta; Ctrl+C detiene el servidor.

También podés usar PowerShell:

```powershell
cd C:\Users\Agustin\Documents\CV
C:\hugo\hugo.exe server --bind 127.0.0.1 --port 1313 --baseURL http://localhost:1313/ --disableFastRender
```

Español: `/` · Inglés: `/en/`. Si el puerto está ocupado, cerrá la vista previa anterior o reemplazá ambos `1313` por `1314`.

## Publicarlo cuando hayas revisado el resultado

El workflow `.github/workflows/hugo.yml` compila y publica al recibir un push a **`Main`**, con M mayúscula. No publica desde la rama de revisión `portfolio-refresh`.

Primero verificá los cambios y guardalos:

```powershell
cd C:\Users\Agustin\Documents\CV
git status
git add hugo.yaml layouts/index.html layouts/404.html data/portfolio.json data/es/sections/projects.yaml data/en/sections/projects.yaml static/portfolio static/images/projects static/files/resume.pdf .github/workflows/hugo.yml .gitignore IniciarPortfolio.bat README.md
git commit -m "Redesign portfolio and feature GestionDT"
```

Si estás en `portfolio-refresh`, integrá esa rama a `Main`:

```powershell
git switch Main
git merge portfolio-refresh
git push origin Main
```

Si ya estás en `Main`, alcanza con `git push origin Main` después del commit. No hagas `push --force`. Si Git rechaza el push por cambios remotos, revisá esos cambios antes de integrarlos.

En GitHub, **Settings → Pages → Build and deployment → Source** debe indicar **GitHub Actions**. En **Actions**, esperá a que termine correctamente **Deploy Hugo site to GitHub Pages**. El sitio conservará su URL: <https://agusgonza11.github.io/Agustin-Gonzalez/>.

También se puede iniciar el workflow manualmente con **Run workflow** desde `Main`. La autenticación de Git usa tu cuenta de GitHub o tu clave SSH configurada.

Referencia de publicación: [GitHub Pages con workflows personalizados](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Editar el contenido

- `data/portfolio.json`: textos principales, experiencia y habilidades en ambos idiomas.
- `data/es/sections/projects.yaml` y `data/en/sections/projects.yaml`: archivo de proyectos filtrable. Los dos primeros proyectos de esos archivos son los destacados históricos; la portada define GestionDT, Kiosquito y CI Pipeline por separado.
- `layouts/index.html`: estructura y metadatos del sitio.
- `static/portfolio/style.css`: diseño responsive, tipografía local y modo de impresión.
- `static/portfolio/app.js`: menú, filtro por lenguaje y galería accesible.
- `static/images/projects/gestiondt/`: cuatro capturas de la aplicación real, tomadas desde una base independiente con datos ficticios. No se incluyen bases de datos ni credenciales.
- `static/images/projects/kioskito/`: seis capturas conservadas del proyecto anterior.

Hugo preserva las rutas bajo `/Agustin-Gonzalez/` mediante `relURL`. Para compilar:

```powershell
C:\hugo\hugo.exe --minify --cleanDestinationDir
```

La salida `public/` se genera automáticamente y está ignorada por Git. Los archivos heredados de Toha, npm y otros idiomas se conservan como referencia, pero no forman parte del sitio activo. La configuración nueva no importa el tema ni sus dependencias.

## Revisión editorial

Se destacó el trabajo práctico y la experiencia verificable, sin agregar años de experiencia, seniority ni resultados comerciales inventados. SAP y OneStream se presentan como tecnologías de trabajo; no se afirma un empleador no confirmado.

Se retiró `static/files/resume.pdf` porque era una plantilla de John Doe. No hay descarga de CV hasta contar con un PDF real. También se omitió el LinkedIn que tenía un enlace vacío. Se puede agregar cuando esté confirmada la URL correcta.

La tesis enlaza al [preprint publicado](https://www.preprints.org/manuscript/202601.2405); no se presenta como artículo revisado por pares.

@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\PkgTools-Test" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\PkgTools-Test" %*
)
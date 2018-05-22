@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\PkgTools-Make" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\PkgTools-Make" %*
)
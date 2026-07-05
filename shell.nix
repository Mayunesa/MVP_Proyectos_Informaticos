{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_22
    typescript-language-server
  ];

  shellHook = ''
    echo "=========================================="
    echo "Entorno de desarrollo activado"
    echo "Node versión: $(node -v)"
    echo "npm versión: $(npm -v)"
    echo "=========================================="
  '';
}

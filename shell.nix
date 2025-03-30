{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  packages = [
    pkgs.nodejs_23
  ];

  shellHook = ''
    export PATH=$PATH:$(${pkgs.nodejs}/bin/npm bin)

    npm install
  '';
}

{ pkgs ? import <nixpkgs> {} }:

  pkgs.buildNpmPackage {
    name = "snipgpt";
    version = "0.0.1";

    src = ./.;

    npmDepsHash = "sha256-L8ml5zMo4Zy8EFt4D0bZzk4yp+L3kLdkkUe9UczJzww=";

    dependencies = with pkgs; [
      nodejs
    ];
  }

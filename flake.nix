{
  description = "Snipgpt flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs, utils, ... }: 
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        snipgpt = pkgs.callPackage ./default.nix {
          inherit pkgs;
        };
      in {
        devShells.default = pkgs.mkShell {
          packages = [
            snipgpt
          ];
        };

        packages = {
          default = snipgpt;
        };
    });
}

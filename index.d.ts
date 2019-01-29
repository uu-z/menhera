declare namespace Menhera {
  interface use {
    (data: object | Object[]): Mhr
  }

  interface Mhr {
    _run: Object | Object[]
    _hooks: Object | Object[]
    _compilers: Object
    _scanHooks: Object
    use: use
  }

  interface MhrStatic extends Mhr {
    new (): Mhr
  }
}

declare const Mhr: Menhera.MhrStatic
export default Mhr

declare module 'menhera' {
  export default Mhr
}

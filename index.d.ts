declare global {
  namespace Menhera {
    interface UseObject {
      _run: Object | Object[]
      _hooks: Object | Object[]
      _compilers: Object
      _scanHooks: Object
    }
    interface use {
      (data: UseObject | UseObject[]): Mhr
    }

    interface Mhr {
      use: use
      unuse: use
    }

    interface MhrStatic extends Mhr {
      new (): Mhr
    }
  }
}

declare const Mhr: Menhera.MhrStatic
export default Mhr

declare module 'menhera' {
  export default Mhr
}

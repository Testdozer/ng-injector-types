import { Compiler, snippet } from "ts-snippet";
import "./injection-factory";

describe("Injector factory", () => {
    let compiler: Compiler;

    beforeEach(() => {
        compiler = new Compiler({}, __dirname);
    });

    it("should infer the source's type", () => {
        const s = snippet({
            "snippet.ts": `
                  import {InjectionFactory, TypeOfInjectionFactory} from "./injection-factory";
                  class A implements InjectionFactory{
                    factory(){
                        return 1;
                    }
                  }
                  const actual: TypeOfInjectionFactory<A> = undefined;
      `
        }, compiler);
        s.expect("snippet.ts").toInfer("actual", "number");
    });
});

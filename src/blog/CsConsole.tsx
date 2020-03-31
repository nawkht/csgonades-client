import {
  FC,
  useEffect,
  useCallback,
  useReducer,
  Reducer,
  memo,
  RefObject,
  useRef,
} from "react";

type InputOutPut = { input: string; output?: string };

type Props = {
  actions: InputOutPut[];
};

type State = {
  input: string;
  output: JSX.Element[];
};

const reducer: Reducer<State, any> = (state, action) => {
  switch (action.type) {
    case "clear":
      return {
        input: "",
        output: [],
      };
    case "append":
      return {
        ...state,
        input: state.input + action.payload,
      };
    case "output":
      return {
        ...state,
        output: [
          ...state.output,
          <code key={Math.random().toString()} className="output">
            {action.payload}
          </code>,
        ],
      };
    case "submit":
      return {
        ...state,
        input: "",
        output: [
          ...state.output,
          <code key={Math.random().toString()} className="input">
            ] {state.input}
          </code>,
        ],
      };
    default:
      return state;
  }
};

export const CsConsole: FC<Props> = memo(({ actions }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(reducer, { input: "", output: [] });

  const handleActions = useCallback(async (actions: InputOutPut[]) => {
    dispatch({ type: "clear" });
    for (const action of actions) {
      const { input, output } = action;
      const inputChars = input.split("");
      for (const char of inputChars) {
        dispatch({ type: "append", payload: char });
        await sleep(50);
      }
      await sleep(250);
      dispatch({
        type: "submit",
      });
      if (output) {
        dispatch({
          type: "output",
          payload: output,
        });
      }
      await sleep(1000);
    }
  }, []);

  useVisibility(ref, () => handleActions(actions));

  return (
    <>
      <div className="console" ref={ref}>
        <div className="console-title">Console</div>
        <div className="console-content-wrapper">
          <div className="console-content">{state.output}</div>
          <div className="console-input">
            <code>{state.input}</code>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .console-content code {
          display: block;
        }
        .console-content .output {
          color: #8b8b8b;
        }
      `}</style>
      <style jsx>{`
        .console {
          background: #a2a2a3;
          border-radius: 10px;
          padding-bottom: 15px;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        .console-title {
          color: white;
          font-weight: bold;
          padding-left: 25px;
          padding-top: 15px;
          padding-bottom: 5px;
        }

        .console-content-wrapper {
          background: #3f3d3e;
          color: white;
          margin: 0px 15px;
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .console-content {
          border: 2px solid #363636;
          padding: 5px;
          flex: 1;
        }

        .console-input {
          margin-top: 15px;
          display: flex;
          height: 40px;
          display: flex;
          align-items: center;
          border: 2px solid #363636;
        }

        .console-input code {
          padding: 5px;
          flex: 1;
          margin-right: 20px;
        }

        .console-input button {
          outline: none;
          background: transparent;
          border: 2px solid #363636;
          padding: 5px;
          padding-right: 20px;
          color: white;
        }
      `}</style>
    </>
  );
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useVisibility = (ref: RefObject<HTMLElement>, callback: Function) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 1) {
          callback();
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);
};

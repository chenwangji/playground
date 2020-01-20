import React from 'react'
import ReactDOM from 'react-dom'

let _state // 保存上一次 state
function useState(initialState) {
    _state = _state || initialState
    function setState(newState) {
        _state = newState
        render()
    }

    return [_state, setState]
}

let _deps; // 记录 useEffect 上一次依赖
function useEffect(callback, dependencies) {
    const hasNoDeps = !dependencies // 如果不存在依赖项
    const hasChangeDeps = _deps
    ? dependencies.some((d, i) => d !== _deps[i]) // 前后两次依赖项是否完全相等
    : true

    if (hasNoDeps || hasChangeDeps) {
        callback()
        _deps = dependencies
    }
}

const App = () => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        console.log(count)
    }, [count])

    return (
        <div>
            <span>{count}</span>
            <button onClick={() => setCount(count + 1)}>add 1</button>
        </div>
    )
}

function render() {
    ReactDOM.render(<App />, document.getElementById('root'))
}
render()

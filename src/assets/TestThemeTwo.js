import React from 'react'
import TestTheme from '../TestTheme'

function TestThemeTwo() {
    return (
        <TestTheme>
            <div>
                <button>Hey there</button>
                <form>
                    <label>Name</label>
                    <input placeholder="your name here ..."/>
                </form>
            </div>
        </TestTheme>
    )
}

export default TestThemeTwo

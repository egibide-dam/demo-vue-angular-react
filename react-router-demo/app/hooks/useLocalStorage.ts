import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(defaultValue)

  useEffect(() => {
    const stored = localStorage.getItem(key)
    if (stored !== null) {
      setStoredValue(JSON.parse(stored))
    }
  }, [key])

  const setValue = (value: T) => {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}

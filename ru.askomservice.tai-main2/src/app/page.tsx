"use client";
import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./components/ui/table";
import { Button } from "./components/ui/button";
import { Trash2, Plus, Save } from "lucide-react";

type WhitelistEntry = {
  type: string;
  value: string;
};

export default function Home() {
  const [activePage, setActivePage] = useState<string>("whitelist");
  const [whitelist, setWhitelist] = useState<WhitelistEntry[]>([
    { type: "ID аккаунта ТГ", value: "123456789" },
    { type: "Имя пользователя ТГ", value: "username" },
  ]);

  const addRow = () => {
    setWhitelist([...whitelist, { type: "ID аккаунта ТГ", value: "" }]);
  };

  const updateRow = (index: number, field: keyof WhitelistEntry, value: string) => {
    const newList = [...whitelist];
    newList[index][field] = value;
    setWhitelist(newList);
  };

  const deleteRow = (index: number) => {
    setWhitelist(whitelist.filter((_, i) => i !== index));
  };

  // Функция сохранения данных белого списка на сервере
  const saveWhitelist = async () => {
    try {
      const response = await fetch('/api/whitelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({whitelist: whitelist}),  // Отправляем данные белого списка
      });

      if (!response.ok) {
        throw new Error('Ошибка при сохранении');
      }

      const result = await response.text();  // Получаем ответ от сервера
      console.log("Ответ сервера:", result);  // Выводим ответ в консоль

      alert('Файл сохранён на сервере');  // Сообщение о том, что файл сохранён
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при сохранении');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Шапка с навигацией */}
      <div className="fixed top-0 left-0 right-0 bg-black text-white p-4 shadow-lg z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex gap-8">
            <button
              onClick={() => setActivePage("whitelist")}
              className={`text-lg font-semibold cursor-pointer transition-colors duration-300 ${
                activePage === "whitelist" ? "text-gray-300" : "text-white hover:text-gray-400"
              }`}
            >
              Белый список
            </button>
            <button
              onClick={() => setActivePage("upload")}
              className={`text-lg font-semibold cursor-pointer transition-colors duration-300 ${
                activePage === "upload" ? "text-gray-300" : "text-white hover:text-gray-400"
              }`}
            >
              Загрузка файла
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 mt-20 max-w-4xl mx-auto">
        {activePage === "whitelist" && (
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Управление белым списком</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Тип идентификатора</TableHead>
                    <TableHead>Значение</TableHead>
                    <TableHead>Действие</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {whitelist.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <select
                          value={item.type}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateRow(index, "type", e.target.value)}
                          className="border border-gray-300 p-2 rounded-md w-full bg-white"
                        >
                          <option>ID аккаунта ТГ</option>
                          <option>Имя пользователя ТГ</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateRow(index, "value", e.target.value)}
                          className="border border-gray-300 p-2 rounded-md w-full bg-white"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => deleteRow(index)}
                          className="border border-gray-300 text-black px-3 py-1 rounded-md hover:bg-gray-200 transition"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex gap-4">
                <Button
                  onClick={addRow}
                  className="border border-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-200 transition flex items-center gap-2"
                >
                  <Plus size={16} /> Добавить запись
                </Button>
                <Button
                  onClick={saveWhitelist}
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition flex items-center gap-2"
                >
                  <Save size={16} /> Сохранить
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activePage === "upload" && (
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Загрузка свежей выгрузки сделок</h2>
              <div className="flex flex-col items-center gap-6">
                <input
                  type="file"
                  className="border border-gray-300 p-2 rounded-md w-full max-w-xs cursor-pointer"
                />
                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                  Загрузить файл
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import DiabetesChart from "./DiabetesChart";
import NavBar from "./components/navBar";
import Sidebar from "./components/Sidebar";
const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [records, setRecords] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPredictModal, setShowPredictModal] = useState(false);

  const [formData, setFormData] = useState({
    bloodSugarLevel: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  
  const [predictData, setPredictData] = useState({
    pregnancies: "",
    glucose: "",
    bloodpressure: "",
    skinthickness: "",
    insulin: "",
    bmi: "",
    dpf: "",
    age: "",
  });

  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

 
const fetchRecords = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/diabetes", {
      method: "GET",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    setRecords(data);
  } catch (error) {
    console.error("Error fetching records:", error);
  }
};


const handleAddRecord = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/diabetes", {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      fetchRecords();
      setShowAddModal(false);
      setFormData({
        bloodSugarLevel: "",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      });
    }
  } catch (error) {
    console.error("Error adding record:", error);
  }
};

const handlePredict = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(predictData),
    });
    const result = await response.json();
    setPrediction(result.data[0]);
    setShowPredictModal(false);
  } catch (error) {
    console.error("Error predicting:", error);
  }
};

  const getAverage = () => {
    if (records.length === 0) return 0;
    const sum = records.reduce(
      (acc, r) => acc + parseFloat(r.bloodSugarLevel || 0),
      0
    );
    return (sum / records.length).toFixed(1);
  };

  const getStatus = (level) => {
    if (level < 70) return { text: "Low", color: "text-blue-600", bg: "bg-blue-50" };
    if (level <= 140) return { text: "Normal", color: "text-green-600", bg: "bg-green-50" };
    if (level <= 180) return { text: "High", color: "text-amber-600", bg: "bg-amber-50" };
    return { text: "Very High", color: "text-red-600", bg: "bg-red-50" };
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <NavBar user={user} onLogout={onLogout}/>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
                  <p className="text-gray-600">Welcome back! Here's your health summary.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-600 font-semibold">Total Records</h3>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">📊</span>
                      </div>
                    </div>
                    <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      {records.length}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">entries recorded</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-600 font-semibold">Average Level</h3>
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">📈</span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {getAverage()}
                      </p>
                      <span className="text-xl text-gray-600 font-medium">mg/dL</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">average glucose</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-600 font-semibold">Last Updated</h3>
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">📅</span>
                      </div>
                    </div>

                    <p className="text-xl font-bold text-gray-900">
                      {records.length > 0
                        ? new Date(records[records.length - 1].date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        : "No data"}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">most recent entry</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
                <DiabetesChart records={records} />
                </div>
              </div>
            )}

            {/* Tracker Tab */}
            {activeTab === "tracker" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Blood Sugar Records</h2>
                    <p className="text-gray-600">Track and monitor your blood sugar levels</p>
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    <span className="text-xl">➕</span>
                    <span className="font-semibold">Add Record</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="space-y-3">
                    {records.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-4xl">📝</span>
                        </div>
                        <p className="text-gray-500 text-lg font-medium">No records yet</p>
                        <p className="text-gray-400 mt-1">Add your first reading to get started!</p>
                      </div>
                    ) : (
                      records.map((record) => {
                        const status = getStatus(parseFloat(record.bloodSugarLevel));
                        return (
                          <div
                            key={record._id}
                            className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all border border-gray-200"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-4">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-3xl font-bold text-gray-900">
                                    {record.bloodSugarLevel}
                                  </span>
                                  <span className="text-gray-600 font-medium">mg/dL</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status.bg} ${status.color}`}>
                                  {status.text}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600 font-medium">
                                  {new Date(record.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                              {record.notes && (
                                <p className="text-gray-600 mt-3 text-sm bg-white p-3 rounded-lg border border-gray-200">
                                  {record.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Predict Tab */}
            {activeTab === "predict" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Risk Prediction</h2>
                  <p className="text-gray-600">AI-powered diabetes risk assessment</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <button
                    onClick={() => setShowPredictModal(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-semibold text-lg"
                  >
                    Start Risk Assessment
                  </button>

                  {prediction !== null && (
                    <div
                      className={`mt-8 p-8 rounded-2xl shadow-lg border-2 ${
                        prediction === 1
                          ? "bg-gradient-to-br from-red-50 to-orange-50 border-red-200"
                          : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                          prediction === 1 ? "bg-red-100" : "bg-green-100"
                        }`}>
                          <span className="text-4xl">{prediction === 1 ? "⚠️" : "✅"}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2 text-gray-900">
                            Prediction Result
                          </h3>
                          <p className={`text-xl font-semibold mb-2 ${
                            prediction === 1 ? "text-red-600" : "text-green-600"
                          }`}>
                            {prediction === 1 ? "High Risk Detected" : "Low Risk - Keep It Up!"}
                          </p>
                          <p className="text-gray-700">
                            {prediction === 1
                              ? "We recommend consulting with a healthcare professional for a comprehensive evaluation."
                              : "Your health indicators suggest lower risk. Continue your healthy lifestyle!"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Info Tab */}
            {activeTab === "info" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Diabetes Information</h2>
                  <p className="text-gray-600">Learn about diabetes management and healthy living</p>
                </div>

                <div className="grid gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">What is Diabetes?</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Diabetes is a chronic condition that affects how your body processes blood sugar (glucose). 
                      When you have diabetes, your body either doesn't make enough insulin or can't effectively use 
                      the insulin it produces.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Healthy Blood Sugar Ranges</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <span className="font-semibold text-gray-700">Normal (Fasting)</span>
                        <span className="text-green-600 font-bold">70-100 mg/dL</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <span className="font-semibold text-gray-700">Prediabetes (Fasting)</span>
                        <span className="text-blue-600 font-bold">100-125 mg/dL</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                        <span className="font-semibold text-gray-700">Diabetes (Fasting)</span>
                        <span className="text-red-600 font-bold">126+ mg/dL</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Tips for Management</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">🥗</span>
                        <span>Maintain a balanced diet with controlled carbohydrate intake</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">🏃</span>
                        <span>Exercise regularly - aim for at least 30 minutes daily</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">💊</span>
                        <span>Take medications as prescribed by your healthcare provider</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">📊</span>
                        <span>Monitor blood sugar levels regularly</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">😴</span>
                        <span>Get adequate sleep - 7-9 hours per night</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Add New Reading</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blood Sugar Level (mg/dL)
                </label>
                <input
                  type="number"
                  value={formData.bloodSugarLevel}
                  onChange={(e) => setFormData({ ...formData, bloodSugarLevel: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter level"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Add any relevant notes..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRecord}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105"
                >
                  Add Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Predict Modal */}
      {showPredictModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Diabetes Risk Assessment</h3>
              <button
                onClick={() => setShowPredictModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Please provide the following information for an accurate risk assessment:
            </p>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Number of Pregnancies", key: "pregnancies" },
                  { label: "Glucose Level", key: "glucose" },
                  { label: "Blood Pressure (mm Hg)", key: "bloodpressure" },
                  { label: "Skin Thickness (mm)", key: "skinthickness" },
                  { label: "Insulin Level", key: "insulin" },
                  { label: "BMI", key: "bmi", step: "0.1" },
                  { label: "Diabetes Pedigree Function", key: "dpf", step: "0.001" },
                  { label: "Age (years)", key: "age" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      step={field.step || "1"}
                      value={predictData[field.key]}
                      onChange={(e) => setPredictData({ ...predictData, [field.key]: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter value"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowPredictModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePredict}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105"
                >
                  Get Prediction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


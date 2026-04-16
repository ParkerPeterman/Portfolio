import { useState, useMemo } from 'react'
import './App.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  // 1. Your Initial Data (formerly the CSV)
  const [incidents, setIncidents] = useState([
    { id: 1, service: "Authentication", issue: "Latency", status: "Resolved", duration: 2, created: "2026-04-15" },
    { id: 2, service: "API Gateway", issue: "502 Error", status: "Active", duration: 0, created: "2026-04-16" },
    { id: 3, service: "Database", issue: "CPU Spike", status: "Resolved", duration: 4, created: "2026-04-14" },
  ]);

  // 2. Data Analytics Logic (replaces the Python backend)
  const metrics = useMemo(() => {
    const resolved = incidents.filter(i => i.status === "Resolved");
    const active = incidents.filter(i => i.status === "Active").length;
    
    const mttr = resolved.length 
      ? (resolved.reduce((sum, i) => sum + i.duration, 0) / resolved.length).toFixed(1)
      : 0;

    return {
      mttr_hours: mttr,
      active_outages: active,
      system_health: active > 2 ? "Degraded" : "Healthy"
    };
  }, [incidents]);

  // 3. Chart Data Formatting
  const chartData = [
    { name: 'Incidents', total: incidents.length, resolved: incidents.filter(i => i.status === "Resolved").length }
  ];

  // 4. The "Simulation" Logic (Zero-lag version)
  const handleGenerate = () => {
    const services = ["Storage", "Compute", "Networking", "IAM"];
    const issues = ["Timeout", "Auth Failure", "Packet Loss"];
    
    const newIncident = {
      id: Date.now(),
      service: services[Math.floor(Math.random() * services.length)],
      issue: issues[Math.floor(Math.random() * issues.length)],
      status: Math.random() > 0.5 ? "Active" : "Resolved",
      duration: Math.floor(Math.random() * 5) + 1,
      created: new Date().toISOString().split('T')[0]
    };

    setIncidents([...incidents, newIncident]);
  };

  return (
    <div className="dashboard">
      <div className="header-row">
        <h1>Sentinel Service Advisory</h1>
        <button onClick={handleGenerate} className="generate-btn">Simulate Incident</button>
      </div>
      
      <div className="kpi-container">
        <div className="card">
          <h3>MTTR</h3>
          <p className="value">{metrics.mttr_hours} hrs</p>
        </div>
        <div className="card">
          <h3>Active Outages</h3>
          <p className="value">{metrics.active_outages}</p>
        </div>
        <div className="card">
          <h3>System Health</h3>
          <p className={`status ${metrics.system_health.toLowerCase()}`}>{metrics.system_health}</p>
        </div>
      </div>

      <div className="chart-section">
        <h2>System Performance</h2>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#dfe6e9" />
              <Bar dataKey="resolved" fill="#2ecc71" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="incident-table-container">
        <table className="incident-table">
          <thead>
            <tr><th>Service</th><th>Issue</th><th>Status</th></tr>
          </thead>
          <tbody>
            {incidents.map(i => (
              <tr key={i.id}>
                <td>{i.service}</td>
                <td>{i.issue}</td>
                <td><span className={`badge ${i.status.toLowerCase()}`}>{i.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
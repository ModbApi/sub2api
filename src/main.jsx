import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, Bot, Check, ChevronDown, CircleCheck, Code2, Container,
  Database, ExternalLink, GitBranch, Globe2, Layers3, Menu, Network,
  Route, Server, ShieldCheck, SlidersHorizontal, Terminal, X, Zap
} from 'lucide-react';
import './styles.css';

const REPO_URL = 'https://github.com/Wei-Shaw/sub2api';
const RELEASE_URL = `${REPO_URL}/releases`;
const MODBAPI_MIRROR_URL = 'https://aqqq.shop/';
const MODBAPI_RELAY_URL = 'https://modbapi.com/';
const APP_VERSION = '0.1.183';

const features = [
  { icon: Route, title: '统一 API 兼容层', body: '把 Claude、OpenAI、Gemini、Grok 等订阅转换成熟悉的 API 形态，减少应用侧重复适配。' },
  { icon: Layers3, title: '账号池与渠道路由', body: '按优先级、权重和健康状态组织账号与渠道，请求异常时自动切换可用资源。' },
  { icon: SlidersHorizontal, title: '精细的用量控制', body: '用户、令牌、模型和渠道都能独立设置限额、倍率与并发策略，成本边界更清楚。' },
  { icon: Database, title: '可追踪的运营数据', body: '集中查看请求日志、Token 消耗、订阅额度与错误状态，排查问题不再依赖猜测。' },
  { icon: ShieldCheck, title: '权限与访问保护', body: '内置用户分组、令牌管理和管理员控制台，适合自用部署，也适合团队共享。' },
  { icon: Container, title: 'Docker 快速部署', body: 'Go 后端配合前端管理界面，提供清晰的环境变量与容器化路径，迁移更轻量。' }
];

const faqs = [
  ['Sub2API 是什么？', 'Sub2API 是一个 LGPL-3.0 开源的 AI API 中转服务，用于把 Claude、OpenAI、Gemini、Grok 等订阅统一接入到兼容 API 的应用中。'],
  ['Sub2API 支持哪些模型服务？', '项目面向多种订阅和模型渠道，常见包括 Claude、OpenAI、Gemini、Grok，也可以根据项目更新接入更多渠道。具体能力以 GitHub 仓库文档为准。'],
  ['可以自建 Sub2API 中转站吗？', '可以。项目提供 Docker 相关部署方式，适合个人、团队或服务运营者自托管。部署前请阅读官方仓库的环境变量、数据库和安全说明。'],
  ['Sub2API 和普通 API 聚合有什么区别？', 'Sub2API 更强调订阅转 API、账号池、渠道调度、用量限制和运营控制台，适合需要统一管理多来源模型资源的场景。'],
  ['在哪里查看源码和更新？', '源码、Issue、文档和最新 Release 都在 Wei-Shaw/sub2api GitHub 仓库中。本页面仅作社区信息整理与使用入口导航。']
];

function Brand({ compact = false }) {
  return <a className={`brand ${compact ? 'compact' : ''}`} href="#top"><img src="/sub2api-logo.svg" alt="Sub2API" /><span>Sub2API</span></a>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [['能力', '#features'], ['架构', '#architecture'], ['部署', '#deploy'], ['FAQ', '#faq']];
  return <header className="site-nav"><Brand /><nav className="desktop-nav">{links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav><div className="nav-actions"><a className="nav-traffic mirror" href={MODBAPI_MIRROR_URL} target="_blank" rel="noreferrer">镜像站</a><a className="nav-traffic relay" href={MODBAPI_RELAY_URL} target="_blank" rel="noreferrer">中转站</a><a className="github-link" href={REPO_URL} target="_blank" rel="noreferrer" aria-label="查看 GitHub 仓库"><GitBranch size={17} /></a><button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? '关闭菜单' : '打开菜单'}>{open ? <X size={20} /> : <Menu size={20} />}</button></div>{open && <nav className="mobile-nav">{links.map(([label, href]) => <a href={href} key={label} onClick={() => setOpen(false)}>{label}<ArrowRight size={15} /></a>)}<a href={MODBAPI_MIRROR_URL} target="_blank" rel="noreferrer">Modb API 镜像站<ExternalLink size={14} /></a><a href={MODBAPI_RELAY_URL} target="_blank" rel="noreferrer">Modb API 中转站<ExternalLink size={14} /></a></nav>}</header>;
}

function TrafficBanner() {
  return <section className="traffic-banner shell" aria-labelledby="traffic-title"><div><span className="eyebrow">Modb API 服务入口</span><h2 id="traffic-title">部署 Sub2API 后，接入稳定的模型 API</h2><p>需要现成的 API 中转服务？可从 Modb API 主站或备用镜像开始，按网络环境灵活选择。</p></div><div className="traffic-actions"><a className="traffic-action mirror" href={MODBAPI_MIRROR_URL} target="_blank" rel="noreferrer"><Globe2 size={18} /><span><b>Modb API 镜像站</b><small>aqqq.shop · 备用入口</small></span><ExternalLink size={15} /></a><a className="traffic-action relay" href={MODBAPI_RELAY_URL} target="_blank" rel="noreferrer"><Server size={18} /><span><b>Modb API 中转站</b><small>modbapi.com · 主站入口</small></span><ArrowRight size={15} /></a></div></section>;
}

function App() {
  const [faq, setFaq] = useState(null);
  useEffect(() => {
    const data = {
      title: 'Sub2API · 开源 AI API 中转服务',
      description: 'Sub2API 开源中转服务，统一接入 Claude、OpenAI、Gemini、Grok 等模型订阅，支持账号池、渠道路由、用量统计与 Docker 部署。'
    };
    document.title = data.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', data.description);
    const script = document.getElementById('sub2api-structured-data');
    if (script) script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Sub2API', applicationCategory: 'DeveloperApplication', softwareVersion: APP_VERSION, operatingSystem: 'Linux, Docker', license: 'https://www.gnu.org/licenses/lgpl-3.0.html', codeRepository: REPO_URL, isAccessibleForFree: true, description: data.description });
  }, []);
  return <div className="page" id="top"><Nav /><main><section className="hero shell"><div className="hero-copy"><div className="status-pill"><span />开源 · 自托管 · 多渠道</div><div className="hero-title"><img src="/sub2api-logo.svg" alt="Sub2API 开源项目 Logo" /><div><h1>Sub2API</h1><p>把订阅资源，变成顺手的 API。</p></div></div><p className="hero-lead">一站式 AI API 中转服务，为 Claude、OpenAI、Gemini、Grok 等模型提供统一接入、智能路由和可观测的用量管理。</p><div className="hero-actions"><a className="button primary" href={REPO_URL} target="_blank" rel="noreferrer"><GitBranch size={17} /> 查看开源项目 <ExternalLink size={14} /></a><a className="button secondary" href="#deploy"><Container size={17} /> 了解部署</a></div><div className="hero-meta"><span><CircleCheck size={15} /> LGPL-3.0</span><span><CircleCheck size={15} /> Go + React</span><span><CircleCheck size={15} /> Docker Ready</span></div></div><div className="console-card"><div className="console-top"><span className="console-dots"><i /><i /><i /></span><span>sub2api / gateway</span><span className="live"><span /> LIVE</span></div><div className="console-body"><div className="console-heading"><div><small>REQUEST ROUTER</small><strong>渠道调度中</strong></div><Zap size={20} /></div><div className="route-flow"><div className="flow-node user"><Bot size={17} /><span>Client</span></div><ArrowRight size={17} /><div className="flow-node hub"><Route size={17} /><span>Sub2API</span></div><ArrowRight size={17} /><div className="flow-node providers"><span className="provider-dot blue" /><span className="provider-dot violet" /><span className="provider-dot green" /><small>多渠道</small></div></div><div className="request-list"><div><span className="ok">200</span><code>/v1/messages</code><em>Claude</em><time>42ms</time></div><div><span className="ok">200</span><code>/v1/chat/completions</code><em>OpenAI</em><time>58ms</time></div><div><span className="warn">429</span><code>retry → channel-02</code><em>自动切换</em><time>91ms</time></div></div><div className="quota-line"><span>今日用量</span><div><i /></div><b>68%</b></div></div></div></section><TrafficBanner /><section className="section shell" id="features"><div className="section-heading"><span className="eyebrow">Why Sub2API</span><h2>一套中转层，<br /><em>接住所有模型来源</em></h2><p>把接入、路由、额度和运营控制放到同一个清晰的系统里。</p></div><div className="feature-grid">{features.map(({ icon: Icon, title, body }) => <article className="feature-card" key={title}><span className="feature-icon"><Icon size={20} /></span><h3>{title}</h3><p>{body}</p></article>)}</div></section><section className="architecture shell" id="architecture"><div className="section-heading centered"><span className="eyebrow">Architecture</span><h2>从请求到响应，每一步都有迹可循</h2><p>Sub2API 将客户端、路由策略、渠道资源和用量记录拆开管理。</p></div><div className="architecture-grid"><div className="architecture-visual"><div className="arch-line line-one" /><div className="arch-line line-two" /><div className="arch-node node-client"><Code2 size={19} /><b>你的应用</b><small>OpenAI SDK / Claude CLI</small></div><div className="arch-node node-gateway"><Network size={22} /><b>Sub2API Gateway</b><small>鉴权 · 路由 · 重试</small></div><div className="arch-node node-pool"><Server size={19} /><b>渠道资源池</b><small>订阅 / API Key / 账号</small></div><div className="arch-node node-data"><Database size={18} /><b>用量与日志</b><small>额度 · Token · 审计</small></div></div><div className="architecture-copy"><div><Check size={16} /><span>兼容常见 OpenAI 风格接口</span></div><div><Check size={16} /><span>按渠道健康度自动转移请求</span></div><div><Check size={16} /><span>用户与令牌权限分层管理</span></div><div><Check size={16} /><span>日志、用量和错误状态可追踪</span></div><a className="inline-link" href={REPO_URL} target="_blank" rel="noreferrer">阅读源码与文档 <ArrowRight size={15} /></a></div></div></section><section className="deploy-section shell" id="deploy"><div className="deploy-copy"><span className="eyebrow">Deploy Your Way</span><h2>几分钟启动<br /><em>自己的中转服务</em></h2><p>从仓库获取源码，按文档准备数据库和环境变量，再通过 Docker 启动服务。开发、测试和生产环境都可以使用相同的部署思路。</p><a className="button primary" href={REPO_URL} target="_blank" rel="noreferrer"><Terminal size={17} /> 查看部署文档 <ExternalLink size={14} /></a></div><div className="terminal-card"><div className="terminal-head"><span /><span /><span /><b>quick-start.sh</b></div><pre><code><span className="muted"># 获取项目</span>{'\n'}git clone github.com/Wei-Shaw/sub2api{ '\n\n' }<span className="muted"># 启动服务</span>{'\n'}docker compose up -d{ '\n\n' }<span className="green">✓ gateway ready</span>{'\n'}<span className="green">✓ admin console ready</span>{'\n'}<span className="green">✓ route pool connected</span></code></pre></div></section><section className="faq-section shell" id="faq"><div className="section-heading centered"><span className="eyebrow">FAQ</span><h2>关于 Sub2API 的常见问题</h2><p>先了解项目边界，再决定是否自建或接入服务。</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${faq === index ? 'open' : ''}`} key={question}><button onClick={() => setFaq(faq === index ? null : index)} aria-expanded={faq === index}><span>{question}</span><ChevronDown size={18} /></button>{faq === index && <p>{answer}</p>}</div>)}</div></section><section className="repo-cta shell"><div><span className="eyebrow">Open Source, Your Rules</span><h2>把 API 接入权，<br /><em>交还给自己。</em></h2><p>这是一个非官方社区介绍站。项目源码、许可证、更新与安全说明，请以 Wei-Shaw/sub2api GitHub 仓库为准。</p></div><div className="repo-actions"><a className="button primary" href={REPO_URL} target="_blank" rel="noreferrer"><GitBranch size={17} /> GitHub 仓库 <ExternalLink size={14} /></a><a className="button secondary" href={RELEASE_URL} target="_blank" rel="noreferrer">查看 Releases <ArrowRight size={15} /></a></div></section></main><footer className="site-footer shell"><div><Brand compact /><p>Sub2API 开源项目社区介绍站</p></div><div className="footer-links"><a href="#features">能力</a><a href="#architecture">架构</a><a href="#deploy">部署</a><a href="#faq">FAQ</a><a href={MODBAPI_MIRROR_URL} target="_blank" rel="noreferrer">Modb API 镜像站</a><a href={MODBAPI_RELAY_URL} target="_blank" rel="noreferrer">Modb API 中转站</a></div><div className="footer-note">非官方站点 · 内容整理自公开开源资料<br />源码与许可证以 GitHub 仓库为准</div></footer></div>;
}

createRoot(document.getElementById('root')).render(<App />);

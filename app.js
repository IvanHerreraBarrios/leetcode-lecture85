var subdomainVisits = function(cpdomains) {
    const domainsCount = {}
    for(domain of cpdomains){
        [visits, subdomains] = parseDomain(domain)
        for(subdomain of subdomains){
            if(domainsCount[subdomain]){
                domainsCount[subdomain] += visits
            } else {
                domainsCount[subdomain] = visits
            }
        }
    }
    return buildResponse(domainsCount)
};

function parseDomain(cpdomain){
    let [visits, domain] = cpdomain.split(" ")
    visits = parseInt(visits)

    const subdomains = [domain]
    while(domain.includes(".")){
        const index = domain.indexOf(".")
        domain = domain.substring(index + 1)
        subdomains.push(domain)
    }

    return [visits, subdomains]
}

function buildResponse(domainsCount){
    const result = []
    for(const domain in domainsCount){
        result.push(`${domainsCount[domain]} ${domain}`)
    }
    return result
}
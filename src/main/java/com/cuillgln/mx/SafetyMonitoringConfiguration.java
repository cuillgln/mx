package com.cuillgln.mx;

import javax.sql.DataSource;

import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

import com.cuillgln.mx.entity.safetymonitoing.SafetyMonitoringStation;
import com.cuillgln.mx.repository.safetymonitoring.SafetyMonitoringStationRepository;

@EnableJpaRepositories(basePackageClasses = SafetyMonitoringStationRepository.class, entityManagerFactoryRef = "kj76EntityManagerFactory")
@Configuration
public class SafetyMonitoringConfiguration {

	@Primary
	@Bean
	@ConfigurationProperties("mx.datasource.kj76")
	public DataSource kj76DataSource() {
		return DataSourceBuilder.create().build();
	}

	@Primary
	@Bean
	public LocalContainerEntityManagerFactoryBean kj76EntityManagerFactory(EntityManagerFactoryBuilder builder) {
		return builder.dataSource(kj76DataSource()).packages(SafetyMonitoringStation.class).persistenceUnit("kj76Unit")
				.build();
	}

}
